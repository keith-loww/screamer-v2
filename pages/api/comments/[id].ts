import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../model/comment";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;
    switch(method) {
        case "GET":
            try {
                const comment = await getComment(id);
                res.status(200).json({comment});
            } catch (error) {
                return res.status(500).json({ success: false, message: error.message })
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed" })
    }
}

const getComment = async (id: string) => await Comment.findById(id);