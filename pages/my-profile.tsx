import { NextPage } from 'next'
import React from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

interface PropTypes {
    user: User
}

const MyProfilePage: NextPage = ({ user }: PropTypes) => {
    return (
        <div>
            <h1>My Profile</h1>
            <p>{user.name}</p>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const user = getSession(context.req).user
    }
})