import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { FaCheckCircle } from "react-icons/fa"
import { Button, Textarea } from '@mantine/core';

type FormData = {
    content: string;
}

export default function NewPostForm(): JSX.Element | null {
    const router = useRouter()
    const {user, isLoading} = useUser();
    const [btnLoading, setBtnLoading] = useState(false);

    const { register, setValue, reset, handleSubmit, formState : { errors } } = useForm<FormData>();
    if (!user || isLoading) return null

    const submitHandler = async ({content} : FormData) => {
        setBtnLoading(true)
        const obj = {
            content : content.toUpperCase(),
            author: user.sub
        }
        const {data} = await axios.post("/api/posts", obj)
        const postID = data.data.id
        const resp = await axios.get(`/api/users/${user.sub}`)
        const userObj = resp.data.data

        await axios.put(`/api/users/${user.sub}`, {
            ...userObj,
            posts: userObj.posts.concat(postID)
        })
        reset();
        showNotification({
            message: "SUCCESSFULLY SCREAMED",
            color: "green",
            icon: <FaCheckCircle />
        })
        setBtnLoading(false)
        router.replace(router.asPath)
    }

    return (
        <div className='card w-full md:w-3/5 lg:w-5/12 xl:w-2/5'>
            <div className='card-body'>
                <h1 className='text-xl md:text-2xl font-semibold mb-2'>
                    HEY, {user.nickname?.toUpperCase()}
                </h1>
                <form onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col space-y-2">
                    <div className='w-4/5'>
                        <Textarea {...register("content", {
                            maxLength : {
                                value: 280,
                                message: 'POST CANNOT EXCEED 280 CHARACTERS'
                            },
                            minLength : {
                                value: 5,
                                message: 'POST MUST BE AT LEAST 5 CHARACTERS LONG'
                            },
                        })}
                        placeholder="SCREAM HERE...(MAX 280 CHARACTERS)"
                        autosize
                        onChange={(e) => setValue("content", e.target.value.toUpperCase())}
                        error={errors ? errors.content?.message : null}
                        className="" />
                    </div>
                    <Button
                    type="submit"
                    loading={btnLoading}
                    className='btn w-1/3 md:w-56'>SUBMIT</Button>
                </form>
            </div>
        </div>
    )
}