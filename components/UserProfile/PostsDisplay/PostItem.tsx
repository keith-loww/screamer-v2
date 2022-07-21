import { useUser } from '@auth0/nextjs-auth0'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { getPostItemDate } from '../../../lib/dateHelper'
import DropdownMenu from '../../HomePage/PostsDisplay/PostItem/DropdownMenu'
import LikeAndCommentDisplay from '../../HomePage/PostsDisplay/PostItem/LikeAndCommentDisplay'
import { Post } from '../../types'

interface PropTypes {
    post: Post,
}

const PostItem = ( { post } : PropTypes ) : JSX.Element => {
    const { user } = useUser();
    const router = useRouter();

    const deleteHandler = async () => {
        try {
            router.replace("/post-deleted");
            await axios.delete(`/api/posts/${post.id}`);
            showNotification({
                message: "POST SUCCESSFULLY DELETED",
                color: "green"
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Link
        href={`/posts/${post.id}`} >
            <a className='card card-bordered shadow-md hover:shadow-lg w-full'>
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
                                        {getPostItemDate(new Date(post.date))}
                                    </span>
                                </div>
                                <div className='text-sm'>
                                    {post.content.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        {user
                        ? (
                            <div className='flex-end'>
                                <DropdownMenu
                                deleteHandler={deleteHandler}
                                 />
                            </div>
                        ) : null}
                    </div>
                    <div className='mt-2'>
                        <LikeAndCommentDisplay post={post} />
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default PostItem