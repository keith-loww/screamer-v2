import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPostItemDate } from '../../../lib/dateHelper'
import { Post, User } from '../../types'

interface PropTypes {
    post: Post,
    user: User
}

const PostItem = ( { post, user } : PropTypes ) : JSX.Element => {
    return (
        <Link
        href={`/posts/${post.id}`} >
            <a className='card card-bordered shadow-md hover:shadow-lg w-full'>
                <div className='card-body'>
                    <div className="flex flex-row space-x-2">                
                        <Link href={`/users/${user.id}`}>
                            <div className="avatar">
                                <div className="h-14 rounded-full relative hover:brightness-75 ease-linear duration-200">
                                    <Image
                                    src={user.picture}
                                    alt="Cannot Fetch Image"
                                    layout='fill' />
                                </div>
                            </div>
                        </Link>
                        <div>
                            <div className='flex space-x-2 items-center'>
                                <Link
                                href={`/users/${user.id}`}
                                className='text-lg font-semibold'>
                                    <span className='hover:underline'>{user.nickname.toUpperCase()}</span>                            
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
                </div>
            </a>
        </Link>
    )
}

export default PostItem