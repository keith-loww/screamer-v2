import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Post, User } from '../../types';

export default function PostItem({ post } : {post: Post}): JSX.Element | null {
    const [authorUser, setAuthorUser] = useState<User | null>(null)
    console.log({post});
    
    const fetchAuthor = async () => {
        const { data } = await axios.get(`/api/users/${post.author}`)
        console.log(data)
        setAuthorUser(data.data);
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    if (!authorUser) return null

    return (
        <div className='card card-bordered shadow-md hover:shadow-lg'>
            <div className='card-body'>
                <div className="flex flex-row space-x-2">                
                    <div className="avatar">
                        <div className="h-14 rounded-full">
                            <Image 
                            src={authorUser.picture}
                            alt="Cannot Fetch Image"
                            className='rounded-full'
                            layout='fill' />
                        </div>
                    </div>
                    <div>
                        <div className='flex space-x-2 items-end'>
                            <span className='text-xl'>
                                {authorUser.name.toUpperCase()}
                            </span>
                            <span className='text-secondary'>
                                {(new Date(post.date)).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            {post.content.toUpperCase()}
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}