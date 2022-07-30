import { Container } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import React from 'react'
import { Post } from '../../../types'
import EditForm from './EditForm';

interface PropTypes {
    post: Post,
    editMode: boolean,
    setEditMode: (editMode: boolean) => void
}

const Content = ({ post, editMode, setEditMode } : PropTypes) => {
    const ref = useClickOutside(() => setEditMode(false));

    return (
        <div className='text-2xl mt-2 break-words whitespace-pre-wrap'>
            {editMode ? 
            <Container p={0} ref={ref} >
                <EditForm
                post={post}
                setEditMode={setEditMode} />
            </Container> 
            : post.content }
        </div>
    )
}

export default Content