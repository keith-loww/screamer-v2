import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Post, User } from '../../components/types'
import UserCard from '../../components/UserProfile/UserCard'
import dbConnect from '../../lib/dbConnect'
import { getUser, getUserWithPosts } from '../api/users/[id]'

interface PropTypes {
    user: User
}

const UserProfile: NextPage<PropTypes> = ({user} : PropTypes) => {
    return (<>
        <Head>
            <title>{user.nickname}'s Profile</title>
        </Head>
        <NavBar />
        <div className='p-2 mt-2 flex justify-center'>
            <UserCard
            user={user} />
        </div>
        <Footer />
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if (!params || !params.id) throw new Error("ID not given")
    await dbConnect()

    const user : User = JSON.parse(JSON.stringify(await getUserWithPosts(params.id)))
    if (!user) throw new Error("cannot find user")

    return {
        props: {user}
    }
}

export default UserProfile