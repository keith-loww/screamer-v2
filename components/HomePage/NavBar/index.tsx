import { useUser } from '@auth0/nextjs-auth0';
import { ActionIcon, Button, Header, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'
import ProfileDropDown from './ProfileDropdown';

export default function NavBar() : JSX.Element {
    const {user} = useUser();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Header height={64}
        className='w-full flex justify-between shadow-md items-center p-2'>
            <div className='justify-start'>
                <Link href="/">
                <Button
                variant='white'
                className="text-xl space-x-2">
                    <IoMegaphoneSharp className='hover:animate-ping' />
                    <span>SCREAMER V2</span>
                </Button>
                </Link>
            </div>
            <div className="navbar-end">
                <Button
                variant='white'
                onClick={() => toggleColorScheme()} >
                    TOGGLE
                </Button>
                {user ? 
                <ProfileDropDown />
                : <LoginBtn />}
            </div>
        </Header>
    )
}

function LoginBtn() : JSX.Element {
    return (
        <Link href="/api/auth/login">
            <a className="btn">LOGIN</a>
        </Link>
    )
}

function LogoutBtn() : JSX.Element {
    return (
        <Link href="/api/auth/logout">
            <a className="btn">LOGOUT</a>
        </Link>
    )
}