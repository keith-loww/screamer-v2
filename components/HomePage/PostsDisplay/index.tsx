import { Stack } from '@mantine/core'
import React from 'react'
import { Post } from '../../types'
import PostItem from './PostItem'

export default function PostsDisplay({posts} : {posts: Post[]}): JSX.Element {

    return (
        <Stack>
            {posts.map(post => (
                <PostItem
                key={post.id}
                post={post} />
            ))}
        </Stack>
    )
}
