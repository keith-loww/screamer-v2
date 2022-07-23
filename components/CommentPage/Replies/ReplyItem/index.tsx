import React from 'react'
import { Card, Divider } from '@mantine/core'
import {  CommentWithoutComments } from '../../../types'
import Content from './Content'
import LikeAndCommentDisplay from './LikeAndCommentDisplay'

interface PropTypes {
    comment: CommentWithoutComments
}

const ReplyItem = ({ comment }: PropTypes) => {
    return (
        <Card className='w-full'>
            <Content
            comment={comment} />
            <div className='w-full mt-2'>
                <LikeAndCommentDisplay comment={comment} />
            </div>
        </Card>
    )
}

export default ReplyItem