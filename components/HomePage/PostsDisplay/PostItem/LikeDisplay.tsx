import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { Post } from '../../../types'

const LikeDisplay = ({post} : {post : Post}) => {
    const {user} = useUser()
    const alreadyLiked = user && post.likedBy.includes(user.sub)

    return (
        <div>
            <button>
                {alreadyLiked
                ? <AiFillLike />
                : <AiOutlineLike />}
            </button>
        </div>
    )
}

export default LikeDisplay