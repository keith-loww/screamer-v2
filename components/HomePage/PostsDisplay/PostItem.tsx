import React from 'react'
import { Post } from '../../types';

export default function PostItem({ post } : {post: Post}): JSX.Element {
    return (
        <div className='card'>
            <div className='card-body'>
                <div>
                    {post.content}
                </div>
                <div>
                    by: {post.author}
                </div>
            </div>
        </div>
    )
}