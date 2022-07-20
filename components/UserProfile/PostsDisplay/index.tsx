import React from 'react'
import { Post, User } from '../../types'
import PostItem from './PostItem'

interface PropTypes {
    user: User,
}

const PostsDisplay = ({user} : PropTypes) : JSX.Element => {
    return (
        <div className='flex flex-col w-full md:w-3/5 xl:w-1/3 mt-4'>
            <div className='flex-1'>
                <span className='text-2xl font-semibold p-2'>
                        {user.nickname.toUpperCase()}'S POSTS
                </span>
                <div className='mt-2 space-y-2'>
                    {user.posts.map(post => (
                        <PostItem
                        key={post.id}
                        user={user}
                        post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostsDisplay