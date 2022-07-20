import Image from 'next/image'
import React from 'react'
import { User } from '../types'
import { BiCalendar } from "react-icons/bi"
import { getUserProfileDate } from '../../lib/dateHelper'

export default function UserCard({user} : {user : User}) {
    return (
        <div className='card bg-neutral w-full md:w-3/5 xl:w-1/3'>
            <div className='card-body'>
                <div className='avatar'>
                    <div className='relative h-24 rounded-full'>
                        <Image
                        src={user.picture}
                        layout="fill"
                        alt='cannot fetch image' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-bold'>{user.nickname.toUpperCase()}</span>
                    <div className='flex space-x-2 items-center'>
                        <BiCalendar />
                        <span className='italic text-secondary'>Joined {getUserProfileDate(new Date(user.created_at))}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}