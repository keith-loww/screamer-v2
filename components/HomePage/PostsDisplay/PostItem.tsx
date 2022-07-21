import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getPostItemDate } from '../../../lib/dateHelper';
import { Post } from '../../types';

interface PropTypes {
    post: Post,
}

export default function PostItem({ post } : PropTypes): JSX.Element | null {
    if (!post) return null
    
    return (
        <Link
        href={`/posts/${post.id}`} >
            <div className='card card-bordered shadow-md hover:shadow-lg w-full md:w-3/5 lg:w-5/12 xl:w-2/5'>
                <div className='card-body'>
                    <div className="flex flex-row space-x-2">                
                        <Link href={`/users/${post.author.id}`}>
                            <div className="avatar">
                                <div className="h-14 rounded-full relative hover:brightness-75 ease-linear duration-200">
                                    <Image
                                    src={post.author.picture}
                                    alt="Cannot Fetch Image"
                                    layout='fill' />
                                </div>
                            </div>
                        </Link>
                        <div>
                            <div className='flex space-x-2 items-center'>
                                <Link
                                href={`/users/${post.author.id}`}
                                className='text-lg font-semibold'>
                                    <span className='hover:underline'>{post.author.nickname.toUpperCase()}</span>                            
                                </Link>
                                <span className='text-secondary'>
                                    · {getPostItemDate(new Date(post.date))}
                                </span>
                            </div>
                            <div className='text-sm'>
                                {post.content.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}