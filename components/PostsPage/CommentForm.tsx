// create jsx element CommentForm and export default CommentForm
import { useUser } from '@auth0/nextjs-auth0';
import { Textarea } from '@mantine/core';
import React from 'react';
import Avatar from './Avatar';

const CommentForm = () => {
    const {user} = useUser();
    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='flex flex-row space-x-2 p-2'>
            <Avatar
            user={user} />
            <form
            className='flex justify-between'
            onSubmit={handleSubmit}>
                <Textarea
                name='content'
                placeholder='Write a comment...'
                className='w-full' />
                <button
                className='justify-end'
                type="submit">Submit</button>
            </form>

        </div>
    );
}

export default CommentForm;