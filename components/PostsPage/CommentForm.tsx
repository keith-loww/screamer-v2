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
        <div className='flex flex-col'>
            <div className='flex flex-row space-x-2 p-2 items-center'>
                <Avatar
                user={user} />
                <Textarea
                    name='content'
                    placeholder='SCREAM BACK...'
                    className='w-full'
                    autosize />
            </div>
            <div className='flex justify-end p-2'>
                <button
                    className='btn w-1/5'
                    type="submit">Submit
                </button>
            </div>
        </div>
    );
}

export default CommentForm;