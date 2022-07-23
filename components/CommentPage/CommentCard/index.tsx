import React from 'react'
import { Card, Divider, Group } from "@mantine/core";
import { Comment } from '../../types';
import InfoSection from './InfoSection';
import LikeDisplay from './LikeDisplay';

interface PropTypes {
    comment: Comment
}

const CommentCard = ({ comment }: PropTypes) => {
    return (
        <Card shadow="sm">
            <Group>
                <InfoSection comment={comment} />
            </Group>
            <Group mt="md">
                <div className='text-xl'>
                    {comment.content}
                </div>
            </Group>
            <Divider my="sm" />
            <LikeDisplay
            comment={comment} />
        </Card>
    )
}

export default CommentCard