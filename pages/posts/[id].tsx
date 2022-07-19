import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/HomePage/Footer';
import NavBar from '../../components/HomePage/NavBar';
import { Post, User } from '../../components/types'
import { BiLike } from "react-icons/bi"

export default function PostPage({post, author} : {post: Post, author : User}): JSX.Element {
    const router = useRouter()
    const {id} = router.query
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
                        <div className='flex flex-row space-x-2 items-center'>
                            <button className='btn btn-ghost btn-square rounded-full'>
                                <BiLike />
                            </button>
                            <span className='text-lg'>{post.likedBy.length}</span>
                        </div>
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