import React from 'react'
import { getPostItemDate } from '../../../../lib/dateHelper'
import { Comment } from '../../../types'

interface PropTypes {
    comment: Comment
}

const Content = ({ comment }: PropTypes) => {
    return (
        <div className='flex flex-col space-y-2'>
            <span className='text-xl font-semibold hover:underline'>
                {comment.author.nickname.toUpperCase()}
            </span>
            <span className='text-secondary' >
                {getPostItemDate(new Date(comment.date))}
            </span>
        </div>
    )
}

export default Content