import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/HomePage/Footer';
import NavBar from '../../components/HomePage/NavBar';
import { Post, PostData } from '../../components/types'
import LikeDisplay from '../../components/PostsPage/LikeDisplay';
import {  useUser } from '@auth0/nextjs-auth0';
import dbConnect from '../../lib/dbConnect';
import { getPostWithAuthorAndComments } from '../api/posts/[id]';
import DropdownMenu from '../../components/PostsPage/DropdownMenu';
import CommentForm from '../../components/PostsPage/CommentForm';
import CommentDisplay from '../../components/PostsPage/CommentDisplay';
import AvatarNameDateDisplay from '../../components/PostsPage/AvatarNameDateDisplay';
import { AppShell, Card, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FaRegTrashAlt } from 'react-icons/fa'


interface PropTypes {
    post: Post
}

const PostPage : NextPage<PropTypes> = ({ post } : PropTypes) => {
    const router = useRouter()
    const { user } = useUser();

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            if (!user.sub) throw new Error("cannot find user")
            const alreadyLiked = post.likedBy.includes(user?.sub)

            // axios get post
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

    const deleteHandler = async () => {
        await axios.delete(`/api/posts/${post.id}`)
        showNotification({
            message: "POST SUCESSFULLY DELETED",
            color: "green",
            icon: <FaRegTrashAlt />
        })
        router.push("/")
    }

    return (
        <>
            <Head>
                <title>{post.author.nickname.toUpperCase()}&#39;s POST </title>
            </Head>
            <AppShell
            header={<NavBar />} >
                <div className=' flex justify-center align-middle flex-col items-center'>
                    <Card
                    p="xl"
                    shadow="sm"
                    className='w-full md:w-3/5 xl:w-2/5 my-2'>
                        <div className='flex w-full flex-row justify-between'>
                            <AvatarNameDateDisplay
                            post={post} />
                            {(user && user.sub === post.author.id)
                            ? (
                                <div className='justify-end relative bottom-2'>
                                    <DropdownMenu
                                    deleteHandler={deleteHandler} />
                                </div>
                            ) : null}
                        </div>
                        <div className='text-2xl mt-2 break-all whitespace-pre-wrap'>
                            {post.content}
                        </div>
                        <Divider my="md" />
                        <LikeDisplay
                        post={post}
                        likeHandler={likeHandler} />
                        {user
                        ? (
                            <div>
                                <Divider my="md" />
                                <CommentForm post={post} />
                            </div>
                            )
                        : null}
                    </Card>
                    <CommentDisplay comments={post.comments} />
                </div>
            </AppShell>
        </>
    )   
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) throw new Error("ID not given")
    await dbConnect()

    const post = JSON.parse(JSON.stringify(await getPostWithAuthorAndComments(params.id)))
    if (!post) throw new Error("cannot find post")

    return {
        props: {
            post
        }
    }
}

export default PostPage