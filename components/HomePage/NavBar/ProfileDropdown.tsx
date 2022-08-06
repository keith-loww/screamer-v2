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
        <Menu 
        width="xl"
        transition='scale-y'
        position='bottom-end' >  
            <Menu.Target>
            <Avatar className='rounded-full' src={user.picture} size={48} />
            </Menu.Target>
            <Menu.Dropdown>
                <Link href={`/my-profile`} as={`/users/${user.sub}`} >
                    <a>
                        <Menu.Item icon={<CgProfile />} >
                                Profile
                        </Menu.Item>
                    </a>
                </Link>
                <Link href="/api/auth/logout">
                    <a>
                        <Menu.Item color="red" icon={<FiLogOut />} >
                            Logout
                        </Menu.Item>
                    </a>
                </Link>
            </Menu.Dropdown>
        </Menu>
    )
}