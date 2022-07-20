import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Post, User } from '../../types';

export default function PostItem({ post } : {post: Post}): JSX.Element | null {
    if (!post) return null

    return (
        <Link
        href={`/posts/${post.id}`} >
            <a className='card card-bordered shadow-md hover:shadow-lg w-full md:w-3/5'>
                <div className='card-body'>
                    <div className="flex flex-row space-x-2">                
                        <Link href={`/users/${post.author.id}`}>
                            <div className="avatar">
                                <div className="h-14 rounded-full">
                                    <Image
                                    src={post.author.picture}
                                    alt="Cannot Fetch Image"
                                    className='rounded-full'
                                    layout='fill' />
                                </div>
                            </div>
                        </Link>
                        <div>
                            <div className='flex space-x-2 items-center'>
                                <Link
                                href={`/users/${post.author.id}`}
                                className='text-lg font-semibold'>
                                    <a className='underline'>{post.author.nickname.toUpperCase()}</a>
                                </Link>
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