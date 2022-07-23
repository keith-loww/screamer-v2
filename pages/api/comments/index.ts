import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../model/comment";
import Post from "../../../model/post";
import User from "../../../model/user";

// create next handler for comments like posts
export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    await dbConnect();
    const { method } = req;
    switch(method) {
        case "POST":
            try {
                const { content, author : authorID, replyTo : replyToID, replyToType } = req.body
                const author = await User.findById(authorID)
                let replyTo
                if (replyToType === "Post") {
                    replyTo = await Post.findById(replyToID)
                } else {
                    replyTo = await Comment.findById(replyToID)
                }
                const newComment = new Comment({
                    content,
                    author,
                    date: new Date(),
                    likedBy: [],
                    replyTo,
                    replyToType,
                })
                const added = await newComment.save()
                await addCommentToReplyTo(replyToType, replyToID, added.id)
                return res.status(201).json({success: true, data: added})
            } catch (error : unknown) {
                if (error instanceof Error) {
                    return res.status(400).json({success: false, message: error.message})
                }
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed" })
    }
}



const addCommentToReplyTo = async (replyToType: "Post" | "Comment", replyToId: string, commentId: string) => {
    switch(replyToType) {
        case "Post":
            // @ts-ignore
            await Post.findByIdAndUpdate(replyToId, { $push: { comments: commentId } })
            break
        case "Comment":
            // @ts-ignore
            await Comment.findByIdAndUpdate(replyToId, { $push: { comments: commentId } })
            break
    }
}