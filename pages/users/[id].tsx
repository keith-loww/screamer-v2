import { GetServerSideProps } from 'next'
import React from 'react'
import { Post, User } from '../../components/types'
import dbConnect from '../../lib/dbConnect'
import { getPosts } from '../api/posts'
import { getUser } from '../api/users/[id]'

interface PropTypes {
    user: User
    posts: Post[]
}

export default function UserProfile({user, posts} : PropTypes) {
    return (
        <div>
            got here
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    if (!params || !params.id) throw new Error("ID not given")
    await dbConnect()
    const user = await getUser(params.id)
    if (!user) throw new Error("cannot find user")
    const allPosts = await getPosts();
    const posts = allPosts.filter(post => post.author === user.id)

    return {
        props: {user, posts}
    }
}