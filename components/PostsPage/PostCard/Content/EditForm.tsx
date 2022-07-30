import { Button, Group, Stack, Textarea } from '@mantine/core'
import React from 'react'
import { Post } from '../../../types'
import { useForm } from 'react-hook-form'

interface PropTypes {
    post: Post,
}

const EditForm = ({ post }: PropTypes) => {
    const { register, handleSubmit, formState: errors } = useForm()

    return (
        <form>
            <Stack>
                <Textarea
                defaultValue={post.content}
                autosize
                size='xl' />
                <Group position='right' >
                    <Button 
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