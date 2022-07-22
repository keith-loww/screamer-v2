import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { Comment, CommentData } from '../../../types'

const LikeDisplay = ({comment} : {comment : Comment}) => {
    console.log(comment);
    const {user} = useUser()
    const router = useRouter()

    const alreadyLiked = user && user.sub && comment.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            if (!user.sub) throw new Error("cannot find user")
            const alreadyLiked = comment.likedBy.includes(user?.sub)

            const resp = await axios.get(`/api/comments/${comment.id}`)
            const commData : CommentData = resp.data.data
            if (alreadyLiked) {
                await removeLike(commData)
            } else {
                await addLike(commData) 
            }
            router.replace(router.asPath)
        }
        
    }

    const addLike = async (commentData: CommentData) => {
        if (!user || !user.sub) throw new Error("cannot find user")
        const updatedCommentObj = {
            ...commentData,
            author: comment.author.id,
            likedBy: comment.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/comments/${comment.id}`, updatedCommentObj)
    }

    const removeLike = async (commentData: CommentData) => {
        if (!user || !user.sub) throw new Error("cannot find user")
        const updatedCommentObj = {
            ...commentData,
            likedBy: comment.likedBy.filter(id => id !== user?.sub)
        }   
        await axios.put(`/api/comments/${comment.id}`, updatedCommentObj)
    }

    return (
        <div className='flex justify-start space-x-6'>
            <div className='flex items-center space-x-1'>
                <button
                className='btn btn-ghost btn-sm btn-circle'
                onClick={likeHandler}>
                    {alreadyLiked
                    ? <AiFillLike />
                    : <AiOutlineLike />}
                </button>
                <span>
                    {comment.likedBy.length}
                </span>
            </div>
        </div>
    )
}

export default LikeDisplay