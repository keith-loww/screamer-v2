import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ActionIcon } from '@mantine/core'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { Post, PostData } from '../../../types'

const LikeAndCommentDisplay = ({post} : {post : Post}) => {
    const {user} = useUser()
    const router = useRouter()
    if (!user || !user.sub) return null
    const alreadyLiked = user && post.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            if (!user.sub) throw new Error("cannot find user")
            const alreadyLiked = post.likedBy.includes(user?.sub)
            const resp = await axios.get(`/api/posts/${post.id}`)
            const postData : PostData = resp.data.data
            if (alreadyLiked) {
                await removeLike(postData)
            } else {
                await addLike(postData) 
            }
            router.replace(router.asPath)
        }
        
    }

    const addLike = async (postData : PostData) => {
        if (!user.sub) throw new Error("cannot find user")
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async (postData : PostData) => {
        if (!user.sub) throw new Error("cannot find user")
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.filter(id => id !== user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
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
                    {post.likedBy.length}
                </span>
            </div>
            <div className='flex items-center space-x-1'>
                <Link
                href={`/posts/${post.id}`}>
                    <ActionIcon
                    variant='transparent'>
                        <BiCommentError />
                    </ActionIcon>
                </Link>
                <span>
                    {post.comments.length}
                </span>
            </div>
        </div>
    )
}

export default LikeAndCommentDisplay