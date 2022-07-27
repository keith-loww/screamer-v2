import { Button, Group, Stack, Text, TextInput } from '@mantine/core'
import React from 'react'
import { User } from '../../../types'
import { useForm } from 'react-hook-form'

interface PropTypes {
    user: User
}

interface FormData {
    nickname: string
}

const ChangeNickname = ({ user }: PropTypes) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
    const submitHandler = (data: FormData) => {
        console.log(data)
    }

    return (
        <form>
            <Stack spacing="xs" >
                <Text
                size='md'
                weight={500} >
                    Change Nickname
                </Text>
                <TextInput
                required
                label='Nickname'
                placeholder='New nickname...' />
                <Group position='right'>
                    <Button
                    variant='outline'
                    color={'gray'}>
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

export default ChangeNickname