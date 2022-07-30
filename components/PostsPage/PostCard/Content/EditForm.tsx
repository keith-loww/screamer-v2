import { Button, Group, Stack, Textarea } from '@mantine/core'
import React from 'react'
import { Post } from '../../../types'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { FaCheckCircle } from 'react-icons/fa'

interface PropTypes {
    post: Post,
    setEditMode: (editMode: boolean) => void
}

interface FormData {
    content: string
}

const EditForm = ({ post, setEditMode }: PropTypes) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const router = useRouter()

    const submitHandler = async (data: any) => {
        try {
            if (!data.content) return
            const { content } = data
            await axios.put(`/api/posts/${post.id}`, { content })
            showNotification({
                message: "SUCCESSFULLY EDITED",
                color: "green",
                icon: <FaCheckCircle />
            })
            router.replace(router.asPath)
            setEditMode(false)
        } catch (error) {
            showNotification({
                message: "ERROR EDITING",
                color: "red",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <Stack>
                <Textarea
                {...register("content", {
                    required: true,
                    minLength: {
                        value: 5,
                        message: "POST CONTENT MUST BE AT LEAST 5 CHARACTERS"
                    },
                    maxLength: {
                        value: 280,
                        message: "POST CONTENT CANNOT BE MORE THAN 280 CHARACTERS"
                    }
                })}
                error={errors?.content?.message}
                defaultValue={post.content}
                autosize
                size='xl' />
                <Group position='right' >
                    <Button 
                    type='submit'
                    className=''
                    variant='outline' >
                        UPDATE POST
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

export default EditForm