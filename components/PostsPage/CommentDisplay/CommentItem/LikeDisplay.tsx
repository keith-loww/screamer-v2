import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon } from '@mantine/core'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { Comment, CommentData } from '../../../types'

const LikeDisplay = ({comment} : {comment : Comment}) => {
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
                <ActionIcon
                variant='transparent'
                onClick={likeHandler}
                >
                    {alreadyLiked ? <AiFillLike /> : <AiOutlineLike />}
                </ActionIcon>
                <span>
                    {comment.likedBy.length}
                </span>
            </div>
            <div className='flex items-center space-x-1'>
                <Link
                href={`/comments/${comment.id}`}>
                    <ActionIcon
                    variant='transparent'>
                        <BiCommentError />
                    </ActionIcon>
                </Link>
                <span>
                    {comment.comments.length}
                </span>
            </div>
        </div>
    )
}

export default LikeDisplay