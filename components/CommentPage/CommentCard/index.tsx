import React from 'react'
import { Card, Group } from "@mantine/core";
import { Comment } from '../../types';
import InfoSection from './InfoSection';

interface PropTypes {
    comment: Comment
}

const CommentCard = ({ comment }: PropTypes) => {
    return (
        <Card shadow="sm">
            <Group>
                <InfoSection comment={comment} />
            </Group>
        </Card>
    )
}

export default CommentCard