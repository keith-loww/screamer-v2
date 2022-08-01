import { Button, Group, Stack, Textarea } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import editComment from '../../../../lib/comments/editComment'
import { Comment } from '../../../types'

interface PropTypes {
    comment: Comment,
    setEditMode: (editMode: boolean) => void
}

const EditForm = ({ comment, setEditMode }: PropTypes) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<{ content: string }>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submitHandler = async (data: any) => {
        if (!data.content) return
        const { content } = data
        await editComment(content, comment.id, setLoading)
        router.replace(router.asPath)
        setEditMode(false)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <Stack>
                <Textarea
                {...register("content", {
                    required: true,
                    minLength: {
                        value: 5,
                        message: "COMMENT CONTENT MUST BE AT LEAST 5 CHARACTERS"
                    },
                    maxLength: {
                        value: 280,
                        message: "COMMENT CONTENT CANNOT BE LONGER THAN 280 CHARACTERS"
                    }
                })}
                disabled={loading}
                onChange={(e) => setValue("content", e.target.value.toUpperCase())}
                error={errors?.content?.message}
                defaultValue={comment.content}
                autosize
                size='xl' />
                <Group position='right' >
                    <Button 
                    loading={loading}
                    loaderPosition="left"
                    type='submit'
                    className=''
                    variant='outline' >
                        UPDATE COMMENT
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

export default EditForm