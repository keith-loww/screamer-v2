// create jsx element CommentForm and export default CommentForm
import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import Avatar from './Avatar';

const CommentForm = () => {
    const {user} = useUser();
    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='flex flex-row'>
            <Avatar
            user={user} />
            <form
            className='flex justify-between'
            onSubmit={handleSubmit}>
                <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                />
                <button
                className='justify-end'
                type="submit">Submit</button>
            </form>

        </div>
    );
}

export default CommentForm;