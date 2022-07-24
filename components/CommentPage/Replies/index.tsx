import React from 'react'
import { CommentWithoutComments } from '../../types'
import ReplyItem from './ReplyItem'

interface PropTypes {
    comments: CommentWithoutComments[]
}

const Replies = ({ comments }: PropTypes) => {  
    if (comments.length === 0) return null

    return (
        <div className='flex flex-col space-y-2'>
            <div className='text-2xl font-semibold mt-4'>
                REPLIES ({comments.length})
            </div>
            {comments.map(comment => 
                <ReplyItem key={comment.id} comment={comment} />
            )}
        </div>
    )
}


export default Replies