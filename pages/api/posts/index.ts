import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../model/Post";

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
    const {method} = req;
    await dbConnect()

    switch(method) {
        case 'GET' :
            try {
                const posts = await Post.find({})
                return res.status(200).json({
                    success: true,
                    data: posts
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}

export default handler