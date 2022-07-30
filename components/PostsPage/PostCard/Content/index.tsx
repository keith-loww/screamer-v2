import React from 'react'
import { Post } from '../../../types'

interface PropTypes {
    post: Post
}

const Content = ({ post }: PropTypes) => {
    return (
        <div className='text-2xl mt-2 break-words whitespace-pre-wrap'>
            {post.content}
        </div>
    )
}

export default Content