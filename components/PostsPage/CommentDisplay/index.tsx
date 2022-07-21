import React from 'react'
import { Comment } from '../../types';
import { CommentItem } from './CommentItem';

interface PropTypes {
    comments: Comment[]
}

const CommentDisplay = ({comments }: PropTypes) => {
    return (
        <div className='w-full md:w-3/5 xl:w-2/5 p-2'>
            <h1 className='text-2xl font-semibold mb-2'>REPLIES</h1>
            {comments.map((comment, index) => {
                return (
                    <CommentItem key={index} comment={comment} />
                )
            }
            )}
        </div>
    )
}

export default CommentDisplay;