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
import { Divider } from '@mantine/core';


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
        router.push("/post-deleted")
        await axios.get(`/api/posts/${post.id}`)
    }

    return (
        <>
            <Head>
                <title>{post.author.nickname.toUpperCase()}&#39;s POST </title>
            </Head>
            <NavBar />
            <div className=' flex justify-center align-middle flex-col items-center'>
                <div className='card card-bordered shadow-lg w-full md:w-3/5 xl:w-2/5 my-2'>
                    <div className='card-body space-y-2'>
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
                        <div className='text-2xl'>
                            {post.content}
                        </div>
                        <Divider />
                        <LikeDisplay
                        post={post}
                        likeHandler={likeHandler} />
                        {user
                        ? (<div>                       
                                <CommentForm post={post} />
                            </div>)
                        : null}
                    </div>
                </div>
                <CommentDisplay comments={post.comments} />
            </div>
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