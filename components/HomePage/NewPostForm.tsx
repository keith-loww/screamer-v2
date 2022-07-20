import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import PostsDisplay from './PostsDisplay';

type FormData = {
    content: string;
}

export default function NewPostForm(): JSX.Element | null {
    const router = useRouter()
    const {user, isLoading} = useUser();
    const { register, reset, handleSubmit } = useForm<FormData>();

    if (!user || isLoading) return null

    const submitHandler = async ({content} : FormData) => {
        if (!content) return
        const obj = {
            content : content.toUpperCase(),
            author: user.sub
        }
        const {data} = await axios.post("/api/posts", obj)
        const postID = data.data.id
        const resp = await axios.get(`/api/users/${user.sub}`)
        const userObj = resp.data.data
        console.log({userObj});

        await axios.put(`/api/users/${user.sub}`, {
            ...userObj,
            posts: userObj.posts.concat(postID)
        })
        reset();
        router.replace(router.asPath)
    }

    return (
        <div className='card w-full md:w-3/5 xl:w-2/5'>
            <div className='card-body'>
                <h1 className='text-xl md:text-2xl font-semibold mb-2'>
                    HEY, {user.nickname?.toUpperCase()}
                </h1>
                <form onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col space-y-2">
                    <textarea {...register("content")}
                    placeholder="SCREAM HERE...(MAX 280 CHARACTERS)"
                    className="input input-bordered w-4/5 h-32 uppercase" />
                    <button className='btn w-1/3 md:w-56'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}