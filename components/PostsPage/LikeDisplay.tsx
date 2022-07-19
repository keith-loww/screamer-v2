import React, { useContext } from 'react'
import { BiLike } from "react-icons/bi"
import { Post } from '../types'

interface PropTypes {
    post: Post,
    likeHandler?: () => void
}

export default function LikeDisplay({post, likeHandler} : PropTypes): JSX.Element {

    return (
        <div className='flex flex-row space-x-2 items-center'>
            <button className='btn btn-ghost btn-square rounded-full'>
                <BiLike />
            </button>
            <span className='text-lg'>{post.likedBy.length}</span>
        </div>
    )
}