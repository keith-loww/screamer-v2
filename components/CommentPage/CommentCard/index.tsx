import React from 'react'
import { Card, Divider, Group } from "@mantine/core";
import { Comment } from '../../types';
import InfoSection from './InfoSection';
import LikeDisplay from './LikeDisplay';
import NewCommentForm from './NewCommentForm';
import DropDownMenu from './DropDownMenu';

interface PropTypes {
    comment: Comment
}

const CommentCard = ({ comment }: PropTypes) => {
    return (
        <Card shadow="sm">
            <Group>
                <div className='flex flex-row justify-between w-full'>
                    <InfoSection comment={comment} />
                    <div className='justify-end'>
                        <DropDownMenu
                        comment={comment} />
                    </div>
                </div>
            </Group>
            <Group mt="md">
                <div className='text-xl break-words whitespace-pre-wrap'>
                    {comment.content}
                </div>
            </Group>
            <Divider my="sm" />
            <LikeDisplay
            comment={comment} />
            <Divider my="sm" />
            <NewCommentForm comment={comment} />    
        </Card>
    )
}

export default CommentCard