import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../model/comment";
import User from "../../../model/user";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;
    switch(method) {
        case "GET":
            try {
                const comment = await getComment(id);
                res.status(200).json({success: true, data: comment});
            } catch (error) {
                return res.status(500).json({ success: false, message: error.message })
            }
        case "PUT":
            try {
                const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({ success: true, data: updatedComment });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }
        case "DELETE":
            try {
                await Comment.findByIdAndDelete(id);
                res.status(200).json({ success: true, data: null });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed" })
    }
}

const getComment = async (id: string) => await Comment.findById(id);