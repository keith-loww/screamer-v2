import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { createContext } from 'react'
import Footer from '../../components/HomePage/Footer';
import NavBar from '../../components/HomePage/NavBar';
import { Post, User } from '../../components/types'
import LikeDisplay from '../../components/PostsPage/LikeDisplay';
import { useUser } from '@auth0/nextjs-auth0';

export default function PostPage({post, author} : {post: Post, author : User}): JSX.Element {
    const router = useRouter()
    const { user, isLoading } = useUser();
    const {id} = router.query

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            const alreadyLiked = post.likedBy.includes(user.sub)
            if (alreadyLiked) {
                await removeLike()
            } else {
                await addLike() 
            }
            router.replace(router.asPath)
        }
        
    }

    const addLike = async () => {
        const updatedPostObj: Post = {
            ...post,
            likedBy: post.likedBy.concat(user.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async () => {
        const updatedPostObj: Post = {
            ...post,
            likedBy: post.likedBy.filter(id => id !== user.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    return (
        <>
            <Head>
                <html data-theme="business"></html>
                <title>{author.name}'s Post </title>
            </Head>
            <NavBar />
            <div className=' flex justify-center align-middle'>
                <div className='card card-bordered shadow-lg w-1/3 mt-2'>
                    <div className='card-body space-y-2'>
                        <div className='flex flex-row space-x-4'>
                            <div className="avatar">
                                <div className="h-24 rounded-full">
                                    <Image
                                    src={author.picture}
                                    alt="Cannot Fetch Image"
                                    className='rounded-full'
                                    layout='fill' />
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-xl font-semibold'>
                                    {author.name}
                                </span>
                                <span className='text-secondary'>
                                    {(new Date(post.date)).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className='text-2xl'>
                            {post.content}
                        </div>
                        <LikeDisplay
                        post={post}
                        likeHandler={likeHandler} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log(params);
    if (!params || !params.id) throw new Error("ID not given")
    const { data } = await axios.get(`http://localhost:3000/api/posts/${params.id}`)
    
    const post = data.data

    const {data : authorData} = await axios(`http://localhost:3000/api/users/${post.author}`)
    const author = authorData.data

    return {
        props: {
            post,
            author
        }
    }
}