import { Container } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import React from 'react'
import { Comment } from '../../../types';
import EditForm from './EditForm';

interface PropTypes {
    comment: Comment,
    editMode: boolean,
    setEditMode: (editMode: boolean) => void
}

const Content = ({ comment, editMode, setEditMode } : PropTypes) => {
    const ref = useClickOutside(() => setEditMode(false));

    return (
        <div className='text-2xl mt-2 break-words whitespace-pre-wrap'>
            {editMode ? 
            <Container p={0} ref={ref} >
                <EditForm
                comment={comment}
                setEditMode={setEditMode} />
            </Container> 
            : comment.content }
        </div>
    )
}


export default Content