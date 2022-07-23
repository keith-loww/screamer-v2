import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon } from '@mantine/core'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { ReplyTo, ReplyToType } from '../../types'

interface PropTypes {
    type: ReplyToType,
    replyTo: ReplyTo
}

const isPost = (type: ReplyToType): boolean => {
    return type === "Post";
}

const LikeAndCommentDisplay = ({ replyTo, type }: PropTypes) => {
    const {user} = useUser()
    const router = useRouter()
    const alreadyLiked = (user && user.sub && replyTo.likedBy.includes(user?.sub));

    const likeHandler = async () => {
        if (!user) router.push("/api/auth/login")
        let updatedReplyTo
        if (alreadyLiked) {
            updatedReplyTo = {
                ...replyTo,
                author: replyTo.author.id,
                likedBy: replyTo.likedBy.filter(id => id !== user?.sub)
            }
        } else {
            updatedReplyTo = {
                ...replyTo,
                author: replyTo.author.id,
                likedBy: [...replyTo.likedBy, user?.sub]
            }
        }
        if (isPost(type)) {
            await axios.put(`/api/posts/${replyTo.id}`, updatedReplyTo)
        } else {
            await axios.put(`/api/comments/${replyTo.id}`, updatedReplyTo)
        }
        router.replace(router.asPath)
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
                        {replyTo.likedBy.length}
                    </span>
                </div>
                <div className='flex items-center space-x-1'>
                    <Link
                    href={isPost(type) ? `/posts/${replyTo.id}` : `/comments/${replyTo.id}`}>
                        <ActionIcon
                        variant='transparent'>
                            <BiCommentError />
                        </ActionIcon>
                    </Link>
                    <span>
                        {replyTo.comments.length}
                    </span>
                </div>
        </div>
    )
}

export default LikeAndCommentDisplay