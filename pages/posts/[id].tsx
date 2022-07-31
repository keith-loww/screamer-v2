import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import NavBar from '../../components/HomePage/NavBar';
import { Post } from '../../components/types'
import dbConnect from '../../lib/dbConnect';
import { getPostWithAuthorAndComments } from '../api/posts/[id]';
import CommentDisplay from '../../components/PostsPage/CommentDisplay';
import { AppShell } from '@mantine/core';
import PostCard from '../../components/PostsPage/PostCard';


interface PropTypes {
    post: Post
}

const PostPage : NextPage<PropTypes> = ({ post } : PropTypes) => {
    return (
        <>
            <Head>
                <title>{post.author.nickname.toUpperCase()}&#39;s POST - SCREAMER</title>
            </Head>
            <AppShell
            fixed
            header={<NavBar />} >
                <div className=' flex justify-center align-middle flex-col items-center'>
                    <PostCard post={post} />
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