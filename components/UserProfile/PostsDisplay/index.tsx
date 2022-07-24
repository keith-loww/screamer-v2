import { Stack } from '@mantine/core'
import React from 'react'
import PostItem from '../../HomePage/PostsDisplay/PostItem'
import { Post, User } from '../../types'

interface PropTypes {
    user: User,
}

const PostsDisplay = ({user} : PropTypes) : JSX.Element => {
    return (
        <div className='w-full mt-4'>
            <div className='flex-1'>
                <span className='text-2xl font-semibold'>
                        {user.nickname.toUpperCase()}&#39;S POSTS ({user.posts.length})
                </span>
                <Stack className='mt-2 space-y-2'>
                    {user.posts.map(post => (
                        <PostItem
                        key={post.id}
                        post={post} />
                    ))}
                </Stack>
            </div>
        </div>
    )
}

export default PostsDisplay