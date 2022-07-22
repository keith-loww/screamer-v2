import { useUser } from '@auth0/nextjs-auth0'
import React, { useContext } from 'react'
import {AiFillLike, AiOutlineLike} from "react-icons/ai"
import { Post } from '../types'

interface PropTypes {
    post: Post,
    likeHandler: () => void
}

export default function LikeDisplay({post, likeHandler} : PropTypes): JSX.Element {
    const {user, isLoading} = useUser()
    const alreadyLiked = user && user.sub && post.likedBy.includes(user.sub)

    return (
        <div className='flex flex-row space-x-2 items-center'>
            <button
            onClick={likeHandler}
            className='btn btn-ghost btn-square rounded-full'>
            {alreadyLiked
            ? <AiFillLike />
            : <AiOutlineLike />}
            </button>
            <span className='text-lg'>{post.likedBy.length}</span>
        </div>
    )
}