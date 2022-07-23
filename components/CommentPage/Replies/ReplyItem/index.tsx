import React from 'react'
import { Card } from '@mantine/core'
import { Comment } from '../../../types'
import Content from './Content'

interface PropTypes {
    comment: Comment
}

const ReplyItem = ({ comment }: PropTypes) => {
    return (
        <Card className='w-full'>
            <Content
            comment={comment} />
        </Card>
    )
}

export default ReplyItem