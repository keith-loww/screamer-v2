import React from 'react'
import { BiCalendar } from "react-icons/bi"
import { Avatar, Card, Group } from '@mantine/core'
import { User } from '../../types'
import { getUserProfileDate } from '../../../lib/dateHelper'
import EditProfile from './EditProfile'

export default function UserCard({user} : {user : User}) {
    return (
        <Card p="xl" className='w-full' 
        withBorder
        sx={(theme) => ({
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.blue[9]
                : theme.colors.pink[1],
        })} >
            <Avatar
            size="xl"
            className='rounded-full'
            src={user.picture} />
            <Group position='apart'>
                <div className='flex flex-col mt-2'>
                    <span className='text-2xl font-bold'>{user.nickname.toUpperCase()}</span>
                    <div className='flex space-x-2 items-center'>
                        <BiCalendar />
                        <span className='italic text-secondary'>Joined {getUserProfileDate(new Date(user.created_at))}</span>
                    </div>
                </div>
                <EditProfile user={user} />
            </Group>
        </Card>
    )
}