import React from 'react'
import { Comment } from '../../types';
import { CommentItem } from './CommentItem';

interface PropTypes {
    comments: Comment[]
}

const CommentDisplay = ({comments }: PropTypes) => {
    return (
        <div className='card w-full md:w-3/5 xl:w-2/5'>
            <div className='card-body'>
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