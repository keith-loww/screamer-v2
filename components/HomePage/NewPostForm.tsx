import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { FaCheckCircle } from "react-icons/fa"
import { Button, Group, Textarea } from '@mantine/core';
import { UserData } from '../types';

type FormData = {
    content: string;
}

interface PropTypes {
    userData: UserData
}

export default function NewPostForm({userData} : PropTypes): JSX.Element | null {
    const router = useRouter()
    const {user, isLoading} = useUser();
    const [btnLoading, setBtnLoading] = useState(false);
    
    const { register, setValue, reset, handleSubmit, formState : { errors } } = useForm<FormData>();
    if (!user || !userData) return null


    const submitHandler = async ({content} : FormData) => {
        if (!content) return;
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
        <div className='w-full'>
            <h1 className='text-xl md:text-2xl font-semibold my-0 mb-2'>
                HEY, {userData.nickname?.toUpperCase()}
            </h1>
            <form onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col space-y-2">
                <div>
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
                    minRows={2}
                    onChange={(e) => setValue("content", e.target.value.toUpperCase())}
                    error={errors ? errors.content?.message : null}
                    className="" />
                </div>
                <Group position='right' >
                    <Button
                    type="submit"
                    variant='filled'
                    loading={btnLoading}
                    className='w-1/3 md:w-56'>
                        SUBMIT
                    </Button>
                </Group>
            </form>
        </div>
    )
}