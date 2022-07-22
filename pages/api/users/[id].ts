import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import { isString } from "../../../lib/typeguards";
import User from "../../../model/user";


export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    const {method} = req;
    const { id } = req.query
    await dbConnect()
    if (!isString(id)) return res.status(400).json({error: 'id must be a string'})
    
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
        case "PUT":
            try {
                const updated = await User.findByIdAndUpdate(id, req.body, {new: true})
                if (updated) {
                    return res.status(200).json({
                        success: true,
                        data: updated
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

export const getUser = async (id : string) => await User.findById(id)
export const getUserWithPosts = async (id : string) => await User.findById(id).populate("posts")

export const getUserWithPostsAndAuthors = async (id : string) => await User.findById(id).populate({
    path: "posts",
    options: {
        sort: { date: -1 },
    },
    populate: {
        path: "author",
        model: User.modelName,
        select: "nickname id picture",
    }
})