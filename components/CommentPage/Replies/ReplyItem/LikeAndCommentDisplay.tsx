import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon, Tooltip } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import AddOrRemoveLike from '../../../../lib/CommentLikeHelper'
import { CommentData, CommentWithoutComments } from '../../../types'


interface PropTypes {
    comment: CommentWithoutComments
}

const LikeAndCommentDisplay = ({ comment }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const alreadyLiked = user && user.sub && comment.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) router.push('/api/auth/login')
        if (!user || !user.sub) throw new Error("user not found");
        try {
            await AddOrRemoveLike(comment.id, user?.sub)
            router.replace(router.asPath)
        } catch (error) {
            console.log(error)
            showNotification({
                message: "ERROR LIKING COMMENT",
                color: "red"
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