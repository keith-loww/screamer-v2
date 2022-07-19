import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../model/post";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    const {method} = req;
    const {id} = req.query
    
    switch(method) {
        case "GET":
            try {
                const post = await Post.findById(id)
                return res.status(200).json({
                    success: true,
                    data: post
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}