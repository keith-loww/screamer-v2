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
                    <Avatar
                    size="lg"
                    className='rounded-full hover:brightness-75 ease-linear duration-200'
                    src={replyTo.author.picture} />
                </Link>
            </div>
            <div className='flex flex-col w-full'>
                <div className='space-x-2'>
                    <span className='font-semibold hover:underline'>
                        {replyTo.author.nickname.toUpperCase()}
                    </span>
                    <span className='text-secondary'>· {getPostItemDate(new Date(replyTo.date))}</span>
                </div>
                <Link
                href={isPost(type)
                ? `/posts/${replyTo.id}`
                : `/comments/${replyTo.id}`} >
                    <span className='h-full break-all whitespace-pre-wrap'>
                        {replyTo.content}
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default ContentSection