import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'
import { Post, PostData } from '../../../types'
import { showNotification, updateNotification } from '@mantine/notifications'
import { FaCheckCircle } from 'react-icons/fa'

const LikeAndCommentDisplay = ({post} : {post : Post}) => {
    const {user} = useUser()
    const router = useRouter()
    const [likeLoading, setLikeLoading] = useState(false)
    const alreadyLiked = user && user.sub && post.likedBy.includes(user.sub)

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            try {
                setLikeLoading(true)
                if (!user.sub) throw new Error("cannot find user")
                const alreadyLiked = post.likedBy.includes(user?.sub)
                showNotification({
                    id: "like-post",
                    message: alreadyLiked ? "Unliking..." : "Liking...",
                    loading: true,
                    autoClose: false,
                    disallowClose: true
                })
                const resp = await axios.get(`/api/posts/${post.id}`)
                const postData : PostData = resp.data.data
                if (alreadyLiked) {
                    await removeLike(postData)
                } else {
                    await addLike(postData) 
                }
                updateNotification({
                    id: "like-post",
                    message: alreadyLiked ? "SUCESSFULLY UNLIKED" : "SUCCESSFULLY LIKED",
                    loading: false,
                    autoClose: true,
                    color: "green",
                    icon: <FaCheckCircle />
                })
                router.replace(router.asPath)
                setLikeLoading(false)
            } catch (error) {
                console.log(error)
                setLikeLoading(false)
            }
        }
        
    }

    const addLike = async (postData : PostData) => {
        if (!user || !user.sub) throw new Error("cannot find user")
        if (!user.sub) throw new Error("cannot find user")
        const updatedPostObj = {
            ...postData,
            likedBy: post.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async (postData : PostData) => {
        if (!user || !user.sub) throw new Error("cannot find user")
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
                <Tooltip
                position='bottom'
                placement='center'
                withArrow
                label="Like this post" >
                    <ActionIcon
                    variant='transparent'
                    onClick={likeHandler}
                    loading={likeLoading}
                    loaderProps={{
                        variant: "dots"
                    }}
                    >
                        {alreadyLiked ? <AiFillLike /> : <AiOutlineLike />}
                    </ActionIcon>
                </Tooltip>
                <span>
                    {post.likedBy.length}
                </span>
            </div>
            <div className='flex items-center space-x-1'>
                <Tooltip
                position='bottom'
                placement='center'
                label="Comments" >
                    <Link
                    href={`/posts/${post.id}`}>
                        <ActionIcon
                        variant='transparent'>
                            <BiCommentError />
                        </ActionIcon>
                    </Link>
                </Tooltip>
                <span>
                    {post.comments.length}
                </span>
            </div>
        </div>
    )
}

export default LikeAndCommentDisplay