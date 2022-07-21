import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/HomePage/Footer';
import NavBar from '../../components/HomePage/NavBar';
import { Post } from '../../components/types'
import LikeDisplay from '../../components/PostsPage/LikeDisplay';
import { useUser } from '@auth0/nextjs-auth0';
import dbConnect from '../../lib/dbConnect';
import { getPostWithAuthor, getPostWithAuthorAndComments } from '../api/posts/[id]';
import DropdownMenu from '../../components/PostsPage/DropdownMenu';
import Link from 'next/link';
import { getPostPageDate } from '../../lib/dateHelper';
import CommentForm from '../../components/PostsPage/CommentForm';
import CommentDisplay from '../../components/PostsPage/CommentDisplay';

interface PropTypes {
    post: Post
}

const PostPage : NextPage<PropTypes> = ({ post } : PropTypes) => {
    console.log(post);
    
    const router = useRouter()
    const { user } = useUser();

    const likeHandler = async () => {
        if (!user) {
            router.push("/api/auth/login")
        } else {
            if (!user.sub) throw new Error("cannot find user")
            const alreadyLiked = post.likedBy.includes(user?.sub)
            if (alreadyLiked) {
                await removeLike()
            } else {
                await addLike() 
            }
            router.replace(router.asPath)
        }
        
    }

    const addLike = async () => {
        const updatedPostObj = {
            ...post,
            author: post.author.id,
            likedBy: post.likedBy.concat(user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const removeLike = async () => {
        const updatedPostObj = {
            ...post,
            author: post.author.id,
            likedBy: post.likedBy.filter(id => id !== user?.sub)
        }
        await axios.put(`/api/posts/${post.id}`, updatedPostObj)
    }

    const deleteHandler = async () => {
        router.push("/post-deleted")
        const resp = await axios.get(`/api/users/${post.author.id}`)
        const authorObj = resp.data.data
        await axios.put(`/api/users/${post.author.id}`, {
            ...authorObj,
            posts: authorObj.posts.filter(p => p !== post.id)
        })
        await axios.delete(`/api/posts/${post.id}`)
    }

    return (
        <>
            <Head>
                <title>{post.author.nickname}'s Post </title>
            </Head>
            <NavBar />
            <div className=' flex justify-center align-middle'>
                <div className='card card-bordered shadow-lg w-full md:w-3/5 xl:w-2/5 mt-2'>
                    <div className='card-body space-y-2'>
                        <div className='flex w-full flex-row justify-between'>
                            <div className='justify-start flex flex-row space-x-4'>
                                <Link
                                href={`/users/${post.author.id}`} >
                                    <a className="avatar">
                                        <div className="h-20 rounded-full relative hover:brightness-75 ease-linear duration-200">
                                            <Image
                                            src={post.author.picture}
                                            alt="Cannot Fetch Image"
                                            layout='fill' />
                                        </div>
                                    </a>
                                </Link>
                                <div className='flex flex-col space-y-2'>
                                    <Link
                                    href={`/users/${post.author.id}`} >
                                        <a className='text-xl font-semibold hover:underline'>
                                            {post.author.nickname.toUpperCase()}
                                        </a>
                                    </Link>
                                    <span className='text-secondary'>
                                        {getPostPageDate(new Date(post.date))}
                                    </span>
                                </div>
                            </div>

                            {user ? (
                                <div className='justify-end relative bottom-2'>
                                    <DropdownMenu
                                    deleteHandler={deleteHandler} />
                                </div>
                            ) : null}
                        </div>
                        <div className='text-2xl'>
                            {post.content}
                        </div>
                        <LikeDisplay
                        post={post}
                        likeHandler={likeHandler} />
                        {user
                        ? <div>
                                <CommentForm post={post} />
                            </div>
                        : null}
                    </div>
                    <CommentDisplay comments={post.comments} />
                </div>
            </div>
            <Footer />
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