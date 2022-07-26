import { useUser } from '@auth0/nextjs-auth0'
import { ActionIcon, Tooltip } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import {AiFillDislike, AiFillLike, AiOutlineExclamation, AiOutlineLike} from "react-icons/ai"
import { FaCheckCircle } from 'react-icons/fa'
import { getRandomId } from '../../lib/LikePostNotifId'
import { Post, PostData } from '../types'

interface PropTypes {
    post: Post
}

export default function LikeDisplay({post} : PropTypes): JSX.Element {
    const {user, isLoading} = useUser()
    const router = useRouter()
    const alreadyLiked = user && user.sub && post.likedBy.includes(user.sub)
    const [loading, setLoading] = useState(false)


    const likeHandler = async () => {
        if (!user) router.push("/api/auth/login")
        const notifID = getRandomId()
        try { 
            if (!user || !user.sub) throw new Error("cannot find user")
            const alreadyLiked = post.likedBy.includes(user?.sub)
            setLoading(true)
            showNotification({
                id: `like-post-${post.id}-${notifID}`,
                message: alreadyLiked ? "Unliking..." : "Liking...",
                loading: true,
                autoClose: false,
                disallowClose: true
            })

            // axios get post
            const resp = await axios.get(`/api/posts/${post.id}`)
            const postData : PostData = resp.data.data
            if (alreadyLiked) {
                await removeLike(postData)  
            } else {
                await addLike(postData) 
            }
            setLoading(false)
            updateNotification({
                id: `like-post-${post.id}-${notifID}`,
                message: alreadyLiked ? "SUCESSFULLY UNLIKED POST" : "SUCCESSFULLY LIKED POST",
                loading: false,
                autoClose: true,
                color: "green",
                icon: alreadyLiked ? <AiFillDislike /> : <AiFillLike />
            })
            router.replace(router.asPath)
        } catch (error) {
            console.log(error)
            setLoading(false)
            updateNotification({
                id: `like-post-${post.id}-${notifID}`,
                message: "ERROR LIKING",
                loading: false,
                autoClose: true,
                color: "red",
                icon: <AiOutlineExclamation />
            })
        }
    }

    const addLike = async (postData : PostData) => {
        if (!user || !user?.sub) throw new Error("cannot find user")
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async (postData : PostData) => {
        if (!user || !user?.sub) throw new Error("cannot find user")
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.filter(id => id !== user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }


    return (
        <div className='flex flex-row space-x-2 items-center'>
            <Tooltip
            position='bottom'
            placement='center'
            label={alreadyLiked ? "Unlike this post" : "Like this post"} >
                <ActionIcon
                variant='transparent'
                onClick={likeHandler}
                disabled={loading} >
                {alreadyLiked
                ? <AiFillLike size={24} />
                : <AiOutlineLike size={24} />}
                </ActionIcon>
            </Tooltip>
            <span className='text-lg'>{post.likedBy.length}</span>
        </div>
    )
}