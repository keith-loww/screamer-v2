import React from 'react'
import { Card } from '@mantine/core'
import { Comment } from '../../../types'

interface PropTypes {
    comment: Comment
}

const ReplyItem = ({ comment }: PropTypes) => {
    return (
        <Card className='w-full md:w-3/5 xl:w-2/5'>
            
        </Card>
    )
}

export default ReplyItem