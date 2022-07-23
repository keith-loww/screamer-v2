import { Avatar } from '@mantine/core'
import React from 'react'
import { getPostItemDate } from '../../../../lib/dateHelper'
import { Comment } from '../../../types'

interface PropTypes {
    comment: Comment
}

const Content = ({ comment }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-2 w-full'>
            <Avatar
            className='rounded-full'
            src={comment.author.picture}
            size="md" />
            <div className='flex-col w-full'>
                <div className='flex flex-row space-x-2 items-center'>
                    <span className='font-semibold hover:underline'>
                        {comment.author.nickname.toUpperCase()}
                    </span>
                    <span className='text-secondary' >
                        · {getPostItemDate(new Date(comment.date))}
                    </span>
                </div>
                <div className='h-full'>
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default Content