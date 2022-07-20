import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Post, User } from '../../components/types'
import dbConnect from '../../lib/dbConnect'
import { getPosts } from '../api/posts'
import { getUser } from '../api/users/[id]'

interface PropTypes {
    user: User
    posts: Post[]
}

export default function UserProfile({user, posts} : PropTypes) {
    return (<>
        <Head>
            <html data-theme="business"></html>
            <title>{user.nickname}'s Profile</title>
        </Head>
        <NavBar />
        <Footer />
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if (!params || !params.id) throw new Error("ID not given")
    await dbConnect()

    const user : User = JSON.parse(JSON.stringify(await getUser(params.id)))
    if (!user) throw new Error("cannot find user")
    const allPosts : Post[] = JSON.parse(JSON.stringify(await getPosts()));
    const posts = allPosts.filter(post => post.author === user.id)

    return {
        props: {user, posts}
    }
}