import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Post, User } from '../../types';

export default function PostItem({ post } : {post: Post}): JSX.Element | null {
    const [authorUser, setAuthorUser] = useState<User | null>(null)

    const fetchAuthor = async () => {
        const { data } = await axios.get(`/api/users/${post.author}`)
        setAuthorUser(data.data);
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    if (!authorUser) return null

    return (
        <div className='card card-bordered shadow-md hover:shadow-lg'>
            <div className='card-body'>
                <div className='text-xl'>
                    {post.content.toUpperCase()}
                </div>
                <div>
                    BY: {authorUser.name.toUpperCase()}
                    
                </div>
                <div> ON {(new Date(post.date)).toLocaleDateString()}</div>
            </div>
        </div>
    )
}