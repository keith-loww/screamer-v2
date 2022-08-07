import React, { useState } from 'react'
import { Card, Divider, Group } from "@mantine/core";
import { Comment } from '../../types';
import InfoSection from './InfoSection';
import LikeDisplay from './LikeDisplay';
import NewCommentForm from './NewCommentForm';
import DropDownMenu from './DropDownMenu';
import Content from './Content';

interface PropTypes {
    comment: Comment
}

const CommentCard = ({ comment }: PropTypes) => {
    const [editMode, setEditMode] = useState(false);
    return (
        <Card shadow="sm">
            <Group>
                <div className='flex flex-row justify-between w-full'>
                    <InfoSection comment={comment} />
                    <div className='justify-end'>
                        <DropDownMenu
                        setEditMode={setEditMode}
                        comment={comment} />
                    </div>
                </div>
            </Group>
            <Group mt="md">
                <Content
                comment={comment}
                setEditMode={setEditMode}
                editMode={editMode} />
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