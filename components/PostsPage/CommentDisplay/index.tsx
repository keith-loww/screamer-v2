import React from 'react'
import { Comment } from '../../types';

interface PropTypes {
    comments: Comment[]
}

const CommentDisplay = ({comments }: PropTypes) => {
    return (
        <div>
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
    )
}

export default CommentDisplay;