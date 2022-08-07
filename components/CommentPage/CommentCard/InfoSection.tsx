import { Avatar } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { getPostPageDate } from '../../../lib/dateHelper'
import { Comment } from '../../types'

interface PropTypes {
    comment: Comment
}

const InfoSection = ({ comment }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-4 justify-start w-full'>
            <Link href={`/users/${comment.author.id}`}>
                <a>
                    <Avatar
                    className='rounded-full hover:brightness-75 ease-linear duration-100'
                    src={comment.author.picture}
                    size="xl" />
                </a>
            </Link>
            <div className='flex flex-col space-y-2'>
                <Link href={`/users/${comment.author.id}`} >
                    <a className='text-xl font-semibold hover:underline'>
                        {comment.author.nickname.toUpperCase()}
                    </a>
                </Link>
                <span className='text-secondary' >
                    {getPostPageDate(new Date(comment.date))}
                </span>
            </div>
        </div>
    )
}

export default InfoSection