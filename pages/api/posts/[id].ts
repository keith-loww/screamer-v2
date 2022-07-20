import { NextApiRequest, NextApiResponse } from "next";
import { Post as PostType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../model/post";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
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
                const updated = await Post.findByIdAndUpdate(id, req.body) 
                return res.status(200).json({
                    success: true,
                    data: updated
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        case "DELETE":
            try {
                await Post.findByIdAndDelete(id) 
                return res.status(200)
            } catch (error) {
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