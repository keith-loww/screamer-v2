import { useUser } from '@auth0/nextjs-auth0'
import { Avatar, Menu } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProfileDropDown() {
    const { user } = useUser()
    if (!user) {
        return null
    }

    return (
        <Menu control={(<Avatar className='rounded-full' src={user.picture} size={48} />)
        }>  
            <Menu.Item>
                <Link href={`/users/${user.sub}`}>
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/api/auth/logout">
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )
}