import React from 'react'
import { Card, Group } from "@mantine/core";
import { Comment } from '../../types';

interface PropTypes {
    comment: Comment
}

const CommentCard = ({ comment }: PropTypes) => {
    return (
        <Card shadow="sm">
            <Group>
                {comment.content}
            </Group>
        </Card>
    )
}

export default CommentCard