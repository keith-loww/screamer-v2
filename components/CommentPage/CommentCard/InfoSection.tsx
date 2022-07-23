import { Avatar } from '@mantine/core'
import React from 'react'
import { getPostPageDate } from '../../../lib/dateHelper'
import { Comment } from '../../types'

interface PropTypes {
    comment: Comment
}

const InfoSection = ({ comment }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-4 justify-start'>
            <Avatar
            className='rounded-full'
            src={comment.author.picture}
            size="xl" />
            <div className='flex flex-col space-y-2'>
                <span className='text-xl font-semibold hover:underline'>
                    {comment.author.nickname.toUpperCase()}
                </span>
                <span className='text-secondary' >
                    {getPostPageDate(new Date(comment.date))}
                </span>
            </div>
        </div>
    )
}

export default InfoSection