import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon, Tooltip } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineExclamation, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { FaCheckCircle } from 'react-icons/fa'
import AddOrRemoveLike from '../../../../lib/CommentLikeHelper'
import { getRandomId } from '../../../../lib/LikePostNotifId'
import { CommentData, CommentWithoutComments } from '../../../types'


interface PropTypes {
    comment: CommentWithoutComments
}

const LikeAndCommentDisplay = ({ comment }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const [likeLoading, setLikeLoading] = useState(false)
    const alreadyLiked = user && user.sub && comment.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) router.push('/api/auth/login')
        if (!user || !user.sub) throw new Error("user not found");
        const notifID = getRandomId()
        try {
            setLikeLoading(true)
            showNotification({
                id: `like-comment-${comment.id}-${notifID}`,
                message: alreadyLiked ? "Unliking..." : "Liking...",
                loading: true,
                autoClose: false,
                disallowClose: true
            })
            await AddOrRemoveLike(comment.id, user?.sub)
            router.replace(router.asPath)
            setLikeLoading(false)
            updateNotification({
                id: `like-comment-${comment.id}-${notifID}`,
                message: alreadyLiked ? "SUCESSFULLY UNLIKED COMMENT" : "SUCCESSFULLY LIKED COMMENT",
                loading: false,
                autoClose: true,
                color: "green",
                icon: alreadyLiked ? <AiFillDislike /> : <AiFillLike />
            })
        } catch (error) {
            console.log(error)
            setLikeLoading(false)
            updateNotification({
                message: "ERROR LIKING COMMENT",
                color: "red",
                icon: <AiOutlineExclamation />,
                autoClose: true,
                id: `like-comment-${comment.id}-${notifID}`,
                loading: false
            })
        }
    }

    return (
        <div className='flex justify-start space-x-6'>
                <div className='flex items-center space-x-1'>
                    <Tooltip
                    position='bottom'
                    placement='center'
                    label="Like this comment" >
                        <ActionIcon
                        disabled={likeLoading}
                        variant='transparent'
                        onClick={likeHandler}
                        >
                            {alreadyLiked ? <AiFillLike /> : <AiOutlineLike />}
                        </ActionIcon>
                    </Tooltip>
                    <span>
                        {comment.likedBy.length}
                    </span>
                </div>
                <div className='flex items-center space-x-1'>
                    <Tooltip
                    position='bottom'
                    placement='center'
                    label="Comments" >
                        <Link
                        href={`/comments/${comment.id}`}>
                            <ActionIcon
                            variant='transparent'>
                                <BiCommentError />
                            </ActionIcon>
                        </Link>
                    </Tooltip>
                    <span>
                        {comment.comments.length}
                    </span>
                </div>
        </div>
    )
}


export default LikeAndCommentDisplay