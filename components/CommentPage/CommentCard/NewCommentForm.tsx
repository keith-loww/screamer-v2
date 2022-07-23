import { useUser } from '@auth0/nextjs-auth0'
import { Avatar, Button, Textarea } from '@mantine/core'
import React from 'react'
import { Comment } from '../../types'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import { FaCheckCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface PropTypes {
    comment: Comment
}

interface FormData {
    content: string
}

const NewCommentForm = ({ comment }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const { register, handleSubmit, reset, formState : { errors }, setValue } = useForm<FormData>()

    if (!user) return null

    const submitHandler = async (data: any) => {
        const { content } = data
        const obj = {
            content,
            author: user.sub,
            replyToType: "Comment",
            replyTo: comment.id
        }
        await axios.post("/api/comments", obj)
        showNotification({
            message: "SUCCESSFULLY SCREAMED BACK",
            color: "green",
            icon: <FaCheckCircle />
        })
        reset()
        router.replace(router.asPath)
    }

    return (
        <form
        onSubmit={handleSubmit(submitHandler)}
        className='w-full flex flex-row flex-wrap space-y-2'>
            <div className='flex flex-row space-x-2 w-full items-center'>
                <Avatar
                className='rounded-full'
                src={user.picture}
                size="md"
                />
                <Textarea
                {...register("content", {
                    maxLength : {
                        value: 280,
                        message: 'COMMENT CANNOT EXCEED 280 CHARACTERS'
                    },
                    minLength : {
                        value: 5,
                        message: 'COMMENT MUST BE AT LEAST 5 CHARACTERS LONG'
                    }
                })}
                error={errors ? errors.content?.message : null}
                onChange={(e) => setValue("content", e.target.value.toUpperCase())}
                placeholder='SCREAM BACK...'
                className='w-full'
                autosize />
            </div>
            <div className='w-full flex flex-row justify-end'>
                <Button
                type='submit'
                className='w-1/4'
                uppercase
                variant='outline'
                >
                    REPLY
                </Button>
            </div>
        </form>
    )
}

export default NewCommentForm