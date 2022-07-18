import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../model/post";
import User from "../../../model/user";

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
    const {method} = req;
    await dbConnect()

    switch(method) {
        case 'GET' :
            try {
                const posts = await Post.find({})
                console.log(posts);
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
                console.log(author);
                const newPost = new Post({
                    content,
                    author: author,
                    date: new Date(),
                    likes: []
                })
                const added = await newPost.save()
                res.status(200).json({
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

export default handler