import { useUser } from '@auth0/nextjs-auth0';
import { Avatar, Card, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { getPostItemDate } from '../../../../lib/dateHelper';
import { Post } from '../../../types';
import DropdownMenu from './DropdownMenu';
import LikeAndCommentDisplay from './LikeAndCommentDisplay';
import { FaRegTrashAlt } from 'react-icons/fa'
import deletePost from '../../../../lib/posts/deletePost';

interface PropTypes {
    post: Post,
}

export default function PostItem({ post } : PropTypes): JSX.Element | null {
    const { user } = useUser();
    const router = useRouter();
    if (!post) return null

    const deleteHandler = async () => {
        await deletePost(post.id, router);
    }

    return (
        <Card
        p="xl"
        className='w-full'
        shadow="sm" >
            <div className="flex flex-row justify-between w-full">
                <div className='flex space-x-2 w-full'>
                    <Link href={`/users/${post.author.id}`}>
                        <a>
                            <Avatar
                            className='rounded-full hover:brightness-75 duration-100 ease-linear' 
                            src={post.author.picture}
                            size="lg"
                            />
                        </a>
                    </Link>
                    <div className='w-full'>
                        <div className='flex space-x-2 items-center'>
                            <Link
                            href={`/users/${post.author.id}`}
                            className='text-lg font-semibold'>
                                <a className='hover:underline'>{post.author.nickname.toUpperCase()}</a>
                            </Link>
                            <span className='text-secondary'>
                                · {getPostItemDate(new Date(post.date))}
                            </span>
                        </div>
                        <Link href={`/posts/${post.id}`} >
                            <a className='text-sm whitespace-pre-wrap break-words w-full h-full'>
                                {post.content.toUpperCase()}
                            </a>
                        </Link>
                    </div>
                </div>
                {(user && user?.sub === post.author.id)
                ? (
                    <div className='flex-end'>
                        <DropdownMenu
                        deleteHandler={deleteHandler} />
                    </div>
                ) : null}
            </div>
            <Divider my="md" />
            <LikeAndCommentDisplay post={post} />
        </Card>
    )
}