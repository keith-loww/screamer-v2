import React from 'react'
import { ReplyTo, ReplyToType } from '../../types'
import { Card, Group } from "@mantine/core";
import ContentSection from './ContentSection';
import LikeAndCommentDisplay from './LikeAndCommentDisplay';

interface PropTypes {
    type: ReplyToType,
    replyTo: ReplyTo
}

const ReplyToCard = ({ replyTo, type }: PropTypes) => {
    return (
        <Card>
            <Group>
                <ContentSection
                replyTo={replyTo} />
            </Group>
            <Group>
                <LikeAndCommentDisplay 
                type={type}
                replyTo={replyTo} />
            </Group>
        </Card>
    )
}

export default ReplyToCard