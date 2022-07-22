import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Post, User } from '../../components/types'
import PostsDisplay from '../../components/UserProfile/PostsDisplay'
import UserCard from '../../components/UserProfile/UserCard'
import dbConnect from '../../lib/dbConnect'
import { getUserWithPostsAndAuthors } from '../api/users/[id]'

interface PropTypes {
    user: User
}

const UserProfile: NextPage<PropTypes> = ({user} : PropTypes) => {
    return (<>
        <Head>
            <title>{user.nickname}&#39;s Profile</title>
        </Head>
        <NavBar />
        <div className='p-2 mt-2 flex flex-col items-center'>
            <UserCard
            user={user} />
            <PostsDisplay
            user={user} />
        </div>

        
        <Footer />
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if (!params || !params.id) throw new Error("ID not given")
    await dbConnect()

    const user : User = JSON.parse(JSON.stringify(await getUserWithPostsAndAuthors(params.id)))
    if (!user) throw new Error("cannot find user")

    return {
        props: {user}
    }
}

export default UserProfile