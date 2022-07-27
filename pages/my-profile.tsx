import { NextPage } from 'next'
import React from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../lib/dbConnect';
import { User } from '../components/types';
import { getUserWithPostsAndAuthors } from './api/users/[id]';
import Head from 'next/head';
import { AppShell } from '@mantine/core';
import NavBar from '../components/HomePage/NavBar';

interface PropTypes {
    user: User
}

const MyProfilePage: NextPage<PropTypes> = ({ user }: PropTypes) => {
    return (
        <>
            <Head>
                <title>My Profile</title>
            </Head>
            <AppShell
            header={<NavBar />} >
                <div className='flex justify-center' >
                    <div className='w-full md:w-3/5 xl:w-1/3'>
                        <h1>My Profile</h1>
                        <p>{user.name}</p>
                    </div>
                </div>
            </AppShell>
        </>
    )
}

export default MyProfilePage

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        if (!context.req || !context.res) throw new Error('No request or response');
        const session = getSession(context.req, context.res)
        if (!session) throw new Error('No session')
        const userSession = session?.user;
        await dbConnect()
        const user = getUserWithPostsAndAuthors(userSession.sub)
        return {
            props: { user }
        }
    }
})