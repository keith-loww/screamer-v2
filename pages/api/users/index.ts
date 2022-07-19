import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
    const {method} = req;
    await dbConnect()

    switch(method) {
        case 'GET' :
            try {
                const users = await User.find({})
                return res.status(200).json({
                    success: true,
                    data: users
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        case 'POST':
            try {
                const {
                    username,
                    name,
                    created_at,
                    picture
                } = req.body
                const newUser = new User({
                    username,
                    name,
                    created_at,
                    picture,
                    _id: req.body.sub,
                    posts: []
                })
                const added = await newUser.save()
                res.status(200).json({
                    success: true,
                    data: added
                })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
        default:
            return res.status(400).json({ success: false })
    }
}

export default handler