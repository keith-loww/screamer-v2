import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../model/user";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    const {method} = req;
    const {id} = req.query
    
    switch(method) {
        case "GET":
            try {
                const user = await User.findById(id)
                return res.status(200).json({
                    success: true,
                    data: user
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}