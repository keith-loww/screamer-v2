import React from 'react'
import { Comment } from '../../types';

interface PropTypes {
    comments: Comment[]
}

const CommentDisplay = ({comments }: PropTypes) => {
    return (
        <div className='card w-full md:w-3/5 lg:w-5/12 xl:w-1/3'>
            <div className='card-body'>
                {comments.map((comment, index) => {
                    return (
                        <div key={index}>
                            <h3>{comment.author.id}</h3>
                            <p>{comment.content}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default CommentDisplay;