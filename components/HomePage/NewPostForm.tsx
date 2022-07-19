import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

type FormData = {
    content: string;
}

export default function NewPostForm(): JSX.Element | null {
    const {user, isLoading} = useUser();
    const { register, reset, handleSubmit } = useForm<FormData>();

    if (!user || isLoading) return null

    const submitHandler = async ({content} : FormData) => {
        if (!content) return
        const obj = {
            content : content.toUpperCase(),
            author: user.sub
        }
        await axios.post("/api/posts", obj)
        reset();
    }

    return (
        <div className='card w-3/5'>
            <div className='card-body'>
                <h1 className='text-2xl font-semibold mb-2'>
                    HEY, {user.name?.toUpperCase()}
                </h1>
                <form onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col space-y-2">
                    <textarea {...register("content")}
                    placeholder="SCREAM HERE..."
                    className="input input-bordered w-96 h-32 uppercase" />
                    <button className='btn w-56'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}