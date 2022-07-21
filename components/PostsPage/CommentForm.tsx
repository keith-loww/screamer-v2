// create jsx element CommentForm and export default CommentForm
import { useUser } from '@auth0/nextjs-auth0';
import { Textarea } from '@mantine/core';
import React from 'react';
import { Post } from '../types';
import Avatar from './Avatar';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { FaCheckCircle } from 'react-icons/fa';

interface PropTypes {
    post: Post
}

const CommentForm = ( {post} : PropTypes ) => {
    const {user} = useUser();
    const {register, reset, handleSubmit, formState : {errors}} = useForm<FormData>();


    if (!user) return null;

    const submitHandler = async ( { content } : FormData) => {
        try {
            const commentObj = {
                content : content.toUpperCase(),
                author: user.sub,
                post: post.id
            }
            const resp = await axios.post('/api/comments', commentObj);
            const postObj = {
                ...post,
                comments: [...post.comments, resp.data.data.id],
                author: post.author.id
            }
            await axios.put(`/api/posts/${post.id}`, postObj);
            showNotification({
                message: "SUCCESSFULLY SCREAMED BACK",
                color: "green",
                icon: <FaCheckCircle />
            });
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form
        onSubmit={handleSubmit(submitHandler)}
        className='flex flex-col'>
            <div className='flex flex-row space-x-2 p-2 items-center'>
                <Avatar
                user={user} />
                <Textarea
                    {...register("content", {
                            maxLength : {
                                value: 280,
                                message: 'COMMENT CANNOT EXCEED 280 CHARACTERS'
                                },
                            minLength : {
                                value: 5,
                                message: 'COMMENT MUST BE AT LEAST 5 CHARACTERS'
                                }
                            })}
                    name='content'
                    placeholder='SCREAM BACK...'
                    className='w-full'
                    autosize
                    error={errors.content?.message} />
            </div>
            <div className='flex justify-end p-2'>
                <button
                    className='btn w-1/5'
                    type="submit">Submit
                </button>
            </div>
        </form>
    );
}

export default CommentForm;