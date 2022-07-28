import { useUser } from '@auth0/nextjs-auth0'
import { Avatar, Menu } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'

export default function ProfileDropDown() {
    const { user } = useUser()
    if (!user) {
        return null
    }

    return (
        <Menu control={(<Avatar className='rounded-full' src={user.picture} size={48} />)
        }>  
            <Menu.Item icon={<CgProfile />} >
                <Link href={`/my-profile`} as={`/users/${user.sub}`} >
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item color="red" icon={<FiLogOut />} >
                <Link href="/api/auth/logout">
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )
}