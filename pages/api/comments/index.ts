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
                const { content, author : authorID, post : postID } = req.body
                const author = await User.findById(authorID)
                const post = await Post.findById(postID)
                const newComment = new Comment({
                    content,
                    author,
                    date: new Date(),
                    post,
                    likedBy: []
                })
                const added = await newComment.save()
                addCommentToPost(post, added.id)
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

// @ts-ignore
export const addCommentToPost = async (postId: string, commentId: string) => await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } }, { new: true });