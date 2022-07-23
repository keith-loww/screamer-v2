import { useUser } from '@auth0/nextjs-auth0'
import { Avatar, Button, Textarea } from '@mantine/core'
import React from 'react'
import { Comment } from '../../types'

interface PropTypes {
    comment: Comment
}

const NewCommentForm = ({ comment }: PropTypes) => {
    const { user } = useUser()
    if (!user) return null
    return (
        <div className='w-full flex flex-row flex-wrap space-y-2'>
            <div className='flex flex-row space-x-2 w-full items-center'>
                <Avatar
                className='rounded-full'
                src={user.picture}
                size="md"
                />
                <Textarea
                placeholder='SCREAM BACK'
                className='w-full'
                autosize />
            </div>
            <div className='w-full flex flex-row justify-end'>
                <Button
                uppercase
                variant='outline'
                >
                    REPLY
                </Button>
            </div>
        </div>
    )
}

export default NewCommentForm