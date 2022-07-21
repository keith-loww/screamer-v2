import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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
            await axios.delete(`/api/posts/${post.id}`);
            router.replace(router.asPath);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='card card-bordered shadow-md hover:shadow-lg w-full md:w-3/5 lg:w-5/12 xl:w-2/5'>
            <div className='card-body'>
                <div className="flex flex-row justify-between">                
                    <div className='flex space-x-2 w-11/12'>
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
                            <div className='text-sm break-all'>
                                {post.content.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    {user
                    ? (
                        <div className='flex-end'>
                            <DropdownMenu
                            deleteHandler={deleteHandler} />
                        </div>
                    ) : null}
                </div>
                <div className='mt-2'>
                    <LikeAndCommentDisplay post={post} />
                </div>
            </div>
        </div>
    )
}