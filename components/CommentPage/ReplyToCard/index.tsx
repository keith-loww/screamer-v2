import React from 'react'
import { ReplyTo, ReplyToType } from '../../types'
import { Card, Divider, Group } from "@mantine/core";
import ContentSection from './ContentSection';
import LikeAndCommentDisplay from './LikeAndCommentDisplay';

interface PropTypes {
    type: ReplyToType,
    replyTo: ReplyTo
}

const ReplyToCard = ({ replyTo, type }: PropTypes) => {
    return (
        <Card shadow="sm">
            <Group>
                <ContentSection
                type={type}
                replyTo={replyTo} />
            </Group>
            <Divider my="md" />
            <Group>
                <LikeAndCommentDisplay 
                type={type}
                replyTo={replyTo} />
            </Group>
        </Card>
    )
}

export default ReplyToCard