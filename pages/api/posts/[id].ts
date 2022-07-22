import { NextApiRequest, NextApiResponse } from "next";
import PostItem from "../../../components/HomePage/PostsDisplay/PostItem";
import { Post as PostType } from "../../../components/types";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/User"
import Comment from "../../../model/comment";
import Post from "../../../model/post";

const getTokenFromRequest = (req: NextApiRequest) => {
    const auth = req.headers.authorization;
    if (auth && auth.split(' ')[0] === 'Bearer') {
        return auth.split(' ')[1];
    }
    return null;
}


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
                return res.status(400).json({ success: false, error })
            }
        case "DELETE":
            try {
                const post = await Post.findById(id)
                await Post.findByIdAndDelete(id)
                await deleteComments(post.comments)
                await deletePostFromUser(id, post.author)
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

export const getPostWithAuthorAndComments = async (id: any) => await Post.findById(id).populate("author", {
    nickname: 1,
    id: 1,
    picture: 1
}).populate({
    path: "comments",
    options: {
        sort: { date: -1 }
    },
    populate: {
        path: "author",
        model: "User",
        select: "nickname id picture"
    }
})

const deleteComments = async (ids: string[]) => await Comment.deleteMany({ _id: { $in: ids } })
const deletePostFromUser = async (postId: string, userId: string) => await User.findByIdAndUpdate(userId, { $pull: { posts: postId } })