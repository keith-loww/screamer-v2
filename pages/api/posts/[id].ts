import { NextApiRequest, NextApiResponse } from "next";
import PostItem from "../../../components/HomePage/PostsDisplay/PostItem";
import { Post as PostType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user"
import Comment from "../../../model/comment";
import Post from "../../../model/post";
import { getSession } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    const session = getSession(req, res)
    const {method} = req;
    const {id} = req.query
    await dbConnect()
    
    switch(method) {
        case "GET":
            try {
                const post = await getPost(id)
                if (post) {
                    return res.status(200).json({
                        success: true,
                        data: post
                    })
                }
                return res.status(400).json({ success: false })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        case "PUT":
            try {
                if (!session) {
                    return res.status(401).json({ success: false, message: "Unauthorized" })
                }
                const updated = await Post.findByIdAndUpdate(id, req.body) 
                return res.status(200).json({
                    success: true,
                    data: updated
                })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        case "DELETE":
            try {
                const post = await Post.findById(id)
                if (!session || session.user.sub !== post.author) {
                    return res.status(400).json({ success: false, error: "You are not authorized to delete this post" })
                }
                
                await Post.findByIdAndDelete(id)
                await deleteComments(post.comments)
                await deletePostFromUser(id, post.author)
                return res.status(200)
            } catch (error) {
                console.log({error})
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}

export const getPost = async (id: any): Promise<PostType | null> => await Post.findById(id);
export const getPostWithAuthor = async (id: any) => await Post.findById(id).populate("author", {
    nickname: 1,
    id: 1,
    picture: 1
});

export const getPostWithAuthorAndComments = async (id: any) => await Post.findById(id).populate("author", {
    nickname: 1,
    id: 1,
    picture: 1
}).populate({
    path: "comments",
    options: {
        sort: { date: -1 }
    },
    populate: {
        path: "author",
        model: "User",
        select: "nickname id picture"
    }
})

const deleteComments = async (ids: string[]) => await Comment.deleteMany({ _id: { $in: ids } })
const deletePostFromUser = async (postId: string, userId: string) => await User.findByIdAndUpdate(userId, { $pull: { posts: postId } })