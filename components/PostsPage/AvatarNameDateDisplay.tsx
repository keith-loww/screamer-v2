import { Avatar } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getPostPageDate } from '../../lib/dateHelper';
import { Post } from '../types';

interface PropTypes {
    post: Post
}

const AvatarNameDateDisplay = ({ post }: PropTypes) : JSX.Element => {
    return (
        <div className='justify-start flex flex-row space-x-4'>
            <Link
            href={`/users/${post.author.id}`} >
                <a>
                    <Avatar
                    className='rounded-full'
                    size="xl"
                    src={post.author.picture}
                    />
                </a>
            </Link>
            <div className='flex flex-col space-y-2'>
                <Link
                href={`/users/${post.author.id}`} >
                    <a className='text-xl font-semibold hover:underline'>
                        {post.author.nickname.toUpperCase()}
                    </a>
                </Link>
                <span className='text-secondary'>
                    {getPostPageDate(new Date(post.date))}
                </span>
            </div>
        </div>
    )
}

export default AvatarNameDateDisplay