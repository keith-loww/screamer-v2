import { useUser } from '@auth0/nextjs-auth0';
import { ActionIcon, Button, Header, Text, Tooltip, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'
import ProfileDropDown from './ProfileDropdown';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function NavBar() : JSX.Element {
    const {user} = useUser();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Header height={64}
        className='w-full flex justify-between shadow-md items-center p-2'>
            <div className='justify-start'>
                <Link href="/">
                <Button
                sx={(theme) => ({
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : 'black',
                })}
                className="text-xl flex space-x-2"
                variant='subtle'    
                color="gray"
                >
                    <div className='flex items-center space-x-2'>
                        <IoMegaphoneSharp/>
                        <Text size="xl">
                            SCREAMER V2
                        </Text>
                    </div>
                </Button>
                </Link>
            </div>
            <div className="justify-end flex items-center space-x-4">
                <Tooltip
                position='bottom'
                placement='end'
                label="Toggle Light/Dark Mode" >
                    <ActionIcon
                    variant='outline'
                    onClick={() => toggleColorScheme()} >
                        {colorScheme === 'light' ? <BsSun /> : <BsMoon />}
                    </ActionIcon>
                </Tooltip>
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
            <Button
            variant='outline'
            >LOGIN</Button>
        </Link>
    )
}