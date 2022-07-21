import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { Post } from '../../../types'

const LikeAndCommentDisplay = ({post} : {post : Post}) => {
    const {user} = useUser()
    const router = useRouter()
    const alreadyLiked = user && post.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            if (!user.sub) throw new Error("cannot find user")
            const alreadyLiked = post.likedBy.includes(user?.sub)
            const resp = await axios.get(`/api/posts/${post.id}`)
            const postData = resp.data.data
            if (alreadyLiked) {
                await removeLike(postData)
            } else {
                await addLike(postData) 
            }
            router.replace(router.asPath)
        }
        
    }

    const addLike = async (postData) => {
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async (postData) => {
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.filter(id => id !== user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    return (
        <div className='flex justify-start space-x-6'>
            <div className='flex items-center space-x-1'>
                <button
                className='btn btn-ghost btn-sm btn-circle'
                onClick={likeHandler}>
                    {alreadyLiked
                    ? <AiFillLike />
                    : <AiOutlineLike />}
                </button>
                <span>
                    {post.likedBy.length}
                </span>
            </div>
            <div className='flex items-center space-x-1'>
                <Link
                href={`/posts/${post.id}`}>
                    <button
                    className='btn btn-ghost btn-sm btn-circle'>
                        <BiCommentError />
                    </button>
                </Link>
                <span>
                    {post.comments.length}
                </span>
            </div>
        </div>
    )
}

export default LikeAndCommentDisplay