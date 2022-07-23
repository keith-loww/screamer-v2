import { Avatar } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { getPostItemDate } from '../../../../lib/dateHelper'
import {  CommentWithoutComments } from '../../../types'

interface PropTypes {
    comment: CommentWithoutComments
}

const Content = ({ comment }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-2 w-full'>
            <Link href={`/users/${comment.author.id}`} >
                <Avatar
                className='rounded-full hover:brightness-75 ease-linear duration-200'
                src={comment.author.picture}
                size="md"
                 />
            </Link>
            <div className='flex-col w-full'>
                <div className='flex flex-row space-x-2 items-center'>
                    <Link href={`/users/${comment.author.id}`} >
                        <a className='font-semibold hover:underline'>
                            {comment.author.nickname.toUpperCase()}
                        </a>
                    </Link>
                    <span className='text-secondary' >
                        · {getPostItemDate(new Date(comment.date))}
                    </span>
                </div>
                <Link href={`/comments/${comment.id}`} >
                    <div className='h-full'>
                        {comment.content}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Content