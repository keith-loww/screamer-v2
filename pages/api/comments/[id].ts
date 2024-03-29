import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { ReplyToType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import { isString } from "../../../lib/typeguards";
import Comment from "../../../model/comment";
import Post from "../../../model/post";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;
    if (!isString(id)) return res.status(400).json({ error: "Invalid id" });

    const session = getSession(req, res);

    switch(method) {
        case "GET":
            try {
                const comment = await getComment(id);
                return res.status(200).json({success: true, data: comment});
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({succes: false, error: error.message});
                }
                return res.status(400).json({success: false, error: "Unknown error"});
            }
        case "PUT":
            try {
                if (!session) return res.status(401).json({success: false, error: "Unauthorized"});
                const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
                return res.status(200).json({ success: true, data: updatedComment });
            } catch (error) {
                if (error instanceof Error) return res.status(400).json({ success: false, message: error })
                return res.status(400).json({ success: false })                
            }
        case "DELETE":
            try {
                const comment = await getComment(id);
                if (!session || session.user.sub !== comment.author) {
                    return res.status(400).json({ success: false, error: "You are not authorized to delete this comment" })
                }

                await deleteCommentFromReplyTo(id, comment.replyTo, comment.replyToType);
                await deleteCommentsRecusrive(id);
                return res.status(200).json({ success: true, data: null });
            } catch (error) {
                if (error instanceof Error) return res.status(400).json({ success: false, message: error.message })
                return res.status(400).json({ success: false })
            }
        case "PATCH":
            try {
                const comment = await Comment.findByIdAndUpdate(id, { $set: req.body }, { new: true });
                return res.status(200).json({ success: true, data: comment });
            } catch (error) {
                if (error instanceof Error) return res.status(400).json({ success: false, message: error.message })
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed" })
    }
}

export const getComment = async (id: string) => await Comment.findById(id);
export const getCommentForPage = async (id: string) => await Comment.findById(id).populate("author").populate({
        path: "replyTo",
        populate: {
            path: "author",
            select: "nickname picture id"
        }
    }).populate({
        path: "comments",
        populate: {
            path: "author",
            select: "nickname picture id"
        }
    });

// @ts-ignore
const deleteCommentFromPost = async (id: string, postId: string) => await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });

const deleteCommentFromReplyTo = async (id: string, replyToId: string, replyToType: ReplyToType) => {
    switch (replyToType) {
        case "Post":
            // @ts-ignore
            await Post.findByIdAndUpdate(replyToId, { $pull: { comments: id } });
            break;
        case "Comment":
            // @ts-ignore
            await Comment.findByIdAndUpdate(replyToId, { $pull: { comments: id } });
            break;
        default:
            throw new Error("Invalid replyToType");
    }
}

// recursiviely delete all 

export const deleteCommentsRecusrive = async (id: string) => {
    const comment = await Comment.findById(id);
    if (!comment) return;
    comment.comments.forEach(async (commentId : string) => {
        await deleteCommentsRecusrive(commentId);
    });
    await Comment.findByIdAndDelete(id);
}
