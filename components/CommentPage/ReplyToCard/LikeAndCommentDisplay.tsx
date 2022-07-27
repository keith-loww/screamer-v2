import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineExclamation, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { getRandomId } from '../../../lib/LikePostNotifId'
import LikeTooltip from '../../Tooltips/LikeTooltip'
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
    const [likeLoading, setLikeLoading] = useState(false)
    const alreadyLiked = (user && user.sub && replyTo.likedBy.includes(user?.sub));

    const likeHandler = async () => {
        if (!user) router.push("/api/auth/login")
        const notifID = getRandomId()
        try {
            setLikeLoading(true)
            showNotification({
                id: `like-${type}-${replyTo.id}-${notifID}`,
                message: alreadyLiked ? "Unliking..." : "Liking...",
                loading: true,
                autoClose: false,
                disallowClose: true
            })
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
            setLikeLoading(false)
            updateNotification({
                id: `like-${type}-${replyTo.id}-${notifID}`,
                message: alreadyLiked ? `SUCCESSFULLY UNLIKED ${type.toUpperCase()}` : `SUCCESSFULLY LIKED ${type.toUpperCase()}`,
                loading: false,
                autoClose: true,
                color: "green",
                icon: alreadyLiked ? <AiFillDislike /> : <AiFillLike />
            })
            router.replace(router.asPath, router.asPath, { scroll: false })
        } catch (error) {
            console.log(error)
            setLikeLoading(false)
            updateNotification({
                message: "ERROR LIKING",
                color: "red",
                icon: <AiOutlineExclamation />,
                autoClose: true,
                id: `like-${type}-${replyTo.id}-${notifID}`,
                loading: false
            })
        }
    }
    return (
        <div className='flex justify-start space-x-6'>
                <div className='flex items-center space-x-1'>
                    <LikeTooltip 
                    type={type === "Post" ? "post" : "comment"}
                    alreadyLiked={Boolean(alreadyLiked)}
                    position="bottom"
                    placement='center' >
                        <ActionIcon
                        variant='transparent'
                        onClick={likeHandler}
                        disabled={likeLoading}
                        >
                            {alreadyLiked ? <AiFillLike /> : <AiOutlineLike />}
                        </ActionIcon>
                    </LikeTooltip>
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