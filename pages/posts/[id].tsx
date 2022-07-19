import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import Footer from '../../components/HomePage/Footer';
import NavBar from '../../components/HomePage/NavBar';
import { Post } from '../../components/types'

export default function PostPage({post} : {post: Post}): JSX.Element {
    const router = useRouter()
    const {id} = router.query
    return (
        <>
            <Head>
                <html data-theme="business"></html>
                <title>{id}</title>
            </Head>
            <div>
                <NavBar />
                <div>Hello {id}</div>
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log(params);
    if (!params || !params.id) throw new Error("bro")
    const { data } = await axios.get(`http://localhost:3000/api/posts/${params.id}`)
    console.log("DATA", data);
    
    const post = data.data
    return {
        props: {
            post
        }
    }
}