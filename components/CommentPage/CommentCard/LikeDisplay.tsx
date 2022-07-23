import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { Comment } from '../../types'

interface PropTypes {
    comment: Comment
}

const LikeDisplay = ({ comment }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const alreadyLiked = (user && user.sub && comment.likedBy.includes(user.sub))

    const likeHandler = async () => {
        if (!user) router.push("/api/auth/login")
        let newObj
        if (alreadyLiked) {
            newObj = {
                ...comment,
                author: comment.author.id,
                replyTo: comment.replyTo.id,
                likedBy: comment.likedBy.filter(id => id !== user.sub)
            }   
        } else {
            newObj = {
                ...comment,
                author: comment.author.id,
                replyTo: comment.replyTo.id,
                likedBy: [...comment.likedBy, user?.sub]
            }
        }
        await axios.put(`/api/comments/${comment.id}`, newObj)
        router.replace(router.pathname)
    }


    return (
        <div className='w-full flex space-x-2'>
            <div className='flex space-x-2 items-center'>
                <ActionIcon
                variant='transparent'
                onClick={likeHandler} >
                    {alreadyLiked
                    ? <AiFillLike />
                    : <AiOutlineLike />}
                </ActionIcon>
                <span>
                    {comment.likedBy.length}
                </span>
            </div>
        </div>
    )
}

export default LikeDisplay