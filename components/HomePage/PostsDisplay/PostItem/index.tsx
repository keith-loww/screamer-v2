import { useUser } from '@auth0/nextjs-auth0';
import { Card, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { getPostItemDate } from '../../../../lib/dateHelper';
import { Post } from '../../../types';
import DropdownMenu from './DropdownMenu';
import LikeAndCommentDisplay from './LikeAndCommentDisplay';

interface PropTypes {
    post: Post,
}

export default function PostItem({ post } : PropTypes): JSX.Element | null {
    const { user } = useUser();
    const router = useRouter();
    if (!post) return null

    const deleteHandler = async () => {
        try {
            showNotification({
                message: "POST SUCCESSFULLY DELETED",
                color: "green"
            });
            await axios.delete(`/api/posts/${post.id}`);
            router.replace(router.asPath);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card
        className='w-full'
        shadow="sm" >
            <div className="flex flex-row justify-between">
                <div className='flex space-x-2 w-full'>
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
                    <div className='w-full'>
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
                        <Link href={`/posts/${post.id}`} >
                            <div className='text-sm break-all h-full'>
                                {post.content.toUpperCase()}
                            </div>
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