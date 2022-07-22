import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
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
                res.status(200).json({success: true, data: comment});
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({succes: false, error: error.message});
                }
                return res.status(400).json({success: false, error: "Unknown error"});
            }
        case "PUT":
            try {
                console.log(req.body);
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

                await deleteCommentFromPost(id, comment.post);
                await Comment.findByIdAndDelete(id);
                res.status(200).json({ success: true, data: null });
            } catch (error) {
                if (error instanceof Error) return res.status(400).json({ success: false, message: error.message })
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed" })
    }
}

const getComment = async (id: string) => await Comment.findById(id);
const deleteCommentFromPost = async (id: string, postId: string) => await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });