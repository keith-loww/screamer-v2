import axios from 'axios';
import React from 'react'
import { Post } from '../../types'

export default function PostsDisplay({posts} : {post: Post[]}): JSX.Element {
    return (

    )
}

export async function GetServerSideProps() {
    const posts = await axios.get("/api/posts");
    return {
        props: {
            posts
        }
    }
}