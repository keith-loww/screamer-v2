import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineExclamation, AiOutlineLike } from 'react-icons/ai'
import { getRandomId } from '../../../lib/LikePostNotifId'
import LikeTooltip from '../../Tooltips/LikeTooltip'
import { Comment, CommentData } from '../../types'

interface PropTypes {
    comment: Comment
}

const LikeDisplay = ({ comment }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const [likeLoading, setLikeLoading] = useState(false)
    const alreadyLiked = (user && user.sub && comment.likedBy.includes(user.sub))

    const likeHandler = async () => {
        const notifID = getRandomId()
        try {
            if (!user) router.push("/api/auth/login")
            setLikeLoading(true)
            showNotification({
                id: `like-comment-${comment.id}-${notifID}`,
                message: alreadyLiked ? "Unliking..." : "Liking...",
                loading: true,
                autoClose: false,
                disallowClose: true
            })
            const resp = await axios.get(`/api/comments/${comment.id}`)
            const originalComment : CommentData = resp.data.data
            let newObj
            if (alreadyLiked) {
                newObj = {
                    ...originalComment,
                    likedBy: comment.likedBy.filter(id => id !== user.sub)
                }   
            } else {
                newObj = {
                    ...originalComment,
                    likedBy: [...comment.likedBy, user?.sub]
                }
            }
            await axios.put(`/api/comments/${comment.id}`, newObj)
            updateNotification({
                id: `like-comment-${comment.id}-${notifID}`,
                message: alreadyLiked ? "SUCESSFULLY UNLIKED COMMENT" : "SUCCESSFULLY LIKED COMMENT",
                loading: false,
                autoClose: true,
                color: "green",
                icon: alreadyLiked ? <AiFillDislike /> : <AiFillLike />
            })
            setLikeLoading(false)
            router.replace(router.asPath, router.asPath, { scroll: false })
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
        <div className='w-full flex space-x-2'>
            <div className='flex space-x-2 items-center'>
                <LikeTooltip
                position='bottom'
                placement='center'
                alreadyLiked={Boolean(alreadyLiked)}
                type="comment" >
                    <ActionIcon
                    size="lg"
                    variant='transparent'
                    onClick={likeHandler}
                    disabled={likeLoading} >
                        {alreadyLiked
                        ? <AiFillLike size={20} />
                        : <AiOutlineLike size={20} />}
                    </ActionIcon>
                </LikeTooltip>
                <span>
                    {comment.likedBy.length}
                </span>
            </div>
        </div>
    )
}

export default LikeDisplay