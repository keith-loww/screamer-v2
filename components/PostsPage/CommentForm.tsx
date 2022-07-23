// create jsx element CommentForm and export default CommentForm
import { useUser } from '@auth0/nextjs-auth0';
import { Button, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { Post } from '../types';
import Avatar from './Avatar';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface PropTypes {
    post: Post
}

type FormData = {
    content: string;
}

const CommentForm = ( {post} : PropTypes ) => {
    const {user} = useUser();
    const router = useRouter();
    const [btnLoading, setBtnLoading] = useState(false);
    const {register, reset, setValue, handleSubmit, formState : {errors}} = useForm<FormData>();


    if (!user) return null;

    const submitHandler = async ( { content } : FormData) => {
        if (!content) return;
        try {
            setBtnLoading(true);
            const commentObj = {
                content : content.toUpperCase(),
                author: user.sub,
                replyTo: post.id,
                replyToType: "Post"
            }
            await axios.post(  '/api/comments', commentObj);
            showNotification({
                message: "SUCCESSFULLY SCREAMED BACK",
                color: "green",
                icon: <FaCheckCircle />
            });
            reset();
            setBtnLoading(false);
            router.replace(router.asPath);
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
                    onChange={(e) => {setValue('content', e.target.value.toUpperCase())}}
                    error={errors.content?.message} />
            </div>
            <div className='flex justify-end p-2'>
                <Button
                    loading={btnLoading}
                    loaderPosition='right'
                    className='min-w-1/5'
                    type="submit"
                    uppercase
                    color="gray"
                    variant='outline' >
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default CommentForm;