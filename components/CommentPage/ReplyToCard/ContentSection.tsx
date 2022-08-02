import { Avatar } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPostItemDate } from '../../../lib/dateHelper'
import { ReplyTo, ReplyToType } from '../../types'

interface PropTypes {
    replyTo: ReplyTo,
    type: ReplyToType
}

const isPost = (type: ReplyToType) => type === 'Post';

const ContentSection = ({ replyTo, type }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-2 w-full'>
            <div>
                <Link
                href={`/users/${replyTo.author.id}`} >
                    <a>
                        <Avatar
                        size="lg"
                        className='rounded-full hover:brightness-75 ease-linear duration-100'
                        src={replyTo.author.picture} />
                    </a>
                </Link>
            </div>
            <div className='flex flex-col w-full'>
                <div className='space-x-2'>
                    <Link
                    href={`/users/${replyTo.author.id}`} >
                        <a className='font-semibold hover:underline'>
                            {replyTo.author.nickname.toUpperCase()}
                        </a>
                    </Link>
                    <span className='text-secondary'>· {getPostItemDate(new Date(replyTo.date))}</span>
                </div>
                <Link
                href={isPost(type)
                ? `/posts/${replyTo.id}`
                : `/comments/${replyTo.id}`} >
                    <a className='h-full break-words whitespace-pre-wrap'>
                        {replyTo.content}
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default ContentSection