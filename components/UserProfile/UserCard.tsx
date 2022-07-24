import Image from 'next/image'
import React from 'react'
import { User } from '../types'
import { BiCalendar } from "react-icons/bi"
import { getUserProfileDate } from '../../lib/dateHelper'
import { Avatar, Card } from '@mantine/core'

export default function UserCard({user} : {user : User}) {
    return (
        <Card p="xl" className='w-full'>
            <Avatar
            size="xl"
            className='rounded-full'
            src={user.picture} />
            <div className='flex flex-col mt-2'>
                <span className='text-2xl font-bold'>{user.nickname.toUpperCase()}</span>
                <div className='flex space-x-2 items-center'>
                    <BiCalendar />
                    <span className='italic text-secondary'>Joined {getUserProfileDate(new Date(user.created_at))}</span>
                </div>
            </div>
        </Card>
    )
}