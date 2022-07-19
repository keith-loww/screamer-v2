import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Post } from '../../components/types'

export default function PostPage({post} : {post: Post}): JSX.Element {
    return (
        <div>GOT HERE</div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const {data: postData} = await axios.get(`http://localhost:3000/posts/${params.id}`)
    const post = postData.data
    return {
        props: {
            post
        }
    }
}