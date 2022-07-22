import { NextApiRequest, NextApiResponse } from "next";
import { Post as PostType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../model/post";
import User from "../../../model/user";

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
    const {method} = req;
    await dbConnect()

    switch(method) {
        case 'GET' :
            try {
                const posts = await Post.find({}).populate("author", {
                    nickname: 1,
                    id: 1,
                    picture: 1
                })
                return res.status(200).json({
                    success: true,
                    data: posts
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        case 'POST':
            try {
                const { content, author : authorID } = req.body
                const author = await User.findById(authorID)
                const newPost = new Post({
                    content,
                    author: author,
                    date: new Date(),
                    likedBy: [],
                    comments: []
                })
                const added = await newPost.save()
                return res.status(200).json({
                    success: true,
                    data: added
                })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        default:
            return res.status(400).json({ success: false })
    }
}

export const getPosts = async () => {
    return await Post.find({})
}

export const getPostsWithAuthor = async () => await Post.find({}).populate("author", {
    nickname: 1,
    id: 1,
    picture: 1
}).sort({ date: -1 })

export default handler