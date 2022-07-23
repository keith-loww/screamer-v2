import React from 'react'
import { Comment } from '../../types';
import { CommentItem } from './CommentItem';

interface PropTypes {
    comments: Comment[]
}

const CommentDisplay = ({comments }: PropTypes) => {
    if (comments.length === 0) {
        return null;
    }
    return (
        <div className='w-full md:w-3/5 xl:w-2/5 p-2'>
            <h1 className='text-2xl font-semibold mb-2'>REPLIES ({comments.length})</h1>
            <div className='space-y-2'>
                {comments.map((comment, index) => {
                    return (
                        <CommentItem key={index} comment={comment} />
                    )
                }
                )}
            </div>
        </div>
    )
}

export default CommentDisplay;