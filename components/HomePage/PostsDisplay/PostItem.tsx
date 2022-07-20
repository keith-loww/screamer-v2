import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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

    if (!post || !authorUser) return null

    return (
        <Link
        href={`/posts/${post.id}`} >
            <a className='card card-bordered shadow-md hover:shadow-lg w-full md:w-3/5'>
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
                            <div className='flex space-x-2 items-center'>
                                <span className='text-lg font-semibold'>
                                    {authorUser.nickname.toUpperCase()}
                                </span>
                                <span className='text-secondary'>
                                    {(new Date(post.date)).toLocaleDateString()}
                                </span>
                            </div>
                            <div className='text-sm'>
                                {post.content.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}