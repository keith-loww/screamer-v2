import { useUser } from '@auth0/nextjs-auth0';
import { ActionIcon, Button, Group, Header, Tooltip, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'
import ProfileDropDown from './ProfileDropdown';
import { BsSun, BsMoon } from 'react-icons/bs';
import DrawerMenu from './DrawerMenu';

export default function NavBar() : JSX.Element {
    const {user} = useUser();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Header height={64}
        className='w-full flex justify-between shadow-md items-center p-2'>
            <Group position='apart' className='w-full' >
                <Group spacing="xs">
                    <DrawerMenu />
                    <Link href="/">
                        <Button
                        className="text-xl flex space-x-2"
                        variant='subtle'
                        color="gray"
                        >
                            <div className='flex items-center space-x-2'>
                                <IoMegaphoneSharp />
                                <span>SCREAMER V2</span>
                            </div>
                        </Button>
                    </Link>
                </Group>
                <div className="justify-end flex items-center space-x-4">
                    <Tooltip
                    py={6}
                    px="xs"
                    position='bottom-end'
                    withinPortal
                    transition="pop-top-right"
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
            </Group>
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