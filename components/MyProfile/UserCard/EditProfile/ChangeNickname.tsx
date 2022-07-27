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
    const submitHandler = ({ nickname }: FormData) => {
        console.log(nickname)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <Stack spacing="xs" >
                <Text
                size='md'
                weight={500} >
                    Change Nickname
                </Text>
                <TextInput
                {...register("nickname", {
                    required: true,
                    minLength: {
                        value: 3,
                        message: "NICKNAME MUST BE AT LEAST 3 CHARACTERS"
                    },
                    maxLength: {
                        value: 20,
                        message: "NICKNAME CANNOT BE LONGER THAN 20 CHARACTERS"
                    }
                })}
                error={errors?.nickname?.message}
                required
                label='Nickname'
                placeholder='New nickname...' />
                <Group position='right'>
                    <Button
                    type='submit'
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