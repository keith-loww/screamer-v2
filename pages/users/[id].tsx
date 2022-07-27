import { useUser } from '@auth0/nextjs-auth0'
import { AppShell } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Post, User } from '../../components/types'
import PostsDisplay from '../../components/UserProfile/PostsDisplay'
import UserCard from '../../components/UserProfile/UserCard'
import dbConnect from '../../lib/dbConnect'
import { isString } from '../../lib/typeguards'
import { getUserWithPostsAndAuthors } from '../api/users/[id]'

interface PropTypes {
    user: User
}

const UserProfile: NextPage<PropTypes> = ({user} : PropTypes) => {
    const router = useRouter()
    const {user : authUser} = useUser()
    if (user.id === authUser?.sub) router.replace("/my-profile", `/users/${user.id}`)

    return (<>
        <Head>
            <title>{user.nickname.toUpperCase()}&#39;s PROFILE</title>
        </Head>
        <AppShell
        header={<NavBar />} >
            <div className='flex justify-center'>
                <div className='w-full md:w-3/5 xl:w-2/5 flex flex-row flex-wrap'>
                    <UserCard
                    user={user} />
                    <PostsDisplay
                    user={user} />
                </div>
            </div>
        </AppShell>
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if (!params || !params.id) throw new Error("ID not given")
    if (!isString(params.id)) throw new Error("ID not a string")
    await dbConnect()

    const user : User = JSON.parse(JSON.stringify(await getUserWithPostsAndAuthors(params.id)))
    if (!user) throw new Error("cannot find user")

    return {
        props: {user}
    }
}

export default UserProfile