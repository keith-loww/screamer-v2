import { User } from 'auth0';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Post } from '../../types';

export default function PostItem({ post } : {post: Post}): JSX.Element {
    const [author, setAuthor] = useState<User | null>(null);
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/api/v2/users/USER_ID',
            headers: {authorization: 'Bearer YOUR_MGMT_API_ACCESS_TOKEN'}
        }
        // const authorObj = await axios.get(`/api/v2/users`)
    }, [])
    
    return (
        <div className='card card-bordered shadow-md hover:shadow-lg'>
            <div className='card-body'>
                <div className='text-xl'>
                    {post.content.toUpperCase()}
                </div>
                <div>
                    BY: {post.author}
                    
                </div>
                <div> ON {(new Date(post.date)).toLocaleDateString()}</div>
            </div>
        </div>
    )
}