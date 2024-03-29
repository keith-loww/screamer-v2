import { Button, Group, Stack, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { User } from '../../../types'
import { useForm } from 'react-hook-form'
import { useUser } from '@auth0/nextjs-auth0'
import Router, { useRouter } from 'next/router'
import { BiUserPin } from 'react-icons/bi'
import ChangeNickNameConfirmModal from '../../../../lib/EditProfile/ChangeNicknameConfirmModal'

interface PropTypes {
    user: User,
    setModalOpen: (open: boolean) => void
}

interface FormData {
    nickname: string
}

const ChangeNickname = ({ user, setModalOpen }: PropTypes) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const submitHandler = async ({ nickname }: FormData) => {
        if (!nickname) return
        setModalOpen(false)
        ChangeNickNameConfirmModal(nickname, user.id, setLoading, router, reset, setModalOpen)
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
                disabled={loading}
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
                icon={<BiUserPin />}
                onChange={(e) => setValue('nickname', e.target.value.toUpperCase())}
                error={errors?.nickname?.message}
                required
                label='Nickname'
                placeholder='New nickname...' />
                <Group position='right'>
                    <Button
                    loading={loading}
                    loaderPosition='right'
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