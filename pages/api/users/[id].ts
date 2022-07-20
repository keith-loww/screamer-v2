import { NextApiRequest, NextApiResponse } from "next";
import { User as UserType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";


export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    const {method} = req;
    const { id } = req.query
    await dbConnect()
    
    switch(method) {
        case "GET":
            try {
                const user = await getUser(id)
                if (user) {
                    return res.status(200).json({
                        success: true,
                        data: user
                    })
                } 
                return res.status(400).json({ success: false })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}

export const getUser = async (id): Promise<UserType | null> => await User.findById(id)