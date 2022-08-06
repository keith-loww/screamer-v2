import { Burger, NavLink, Drawer, Stack } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai'

const DrawerMenu = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Drawer
            opened={open}
            onClose={() => setOpen(false)}
            padding="xl"
            size="md">
                <Stack>
                    <Link href="/">
                        <a>
                            <NavLink
                            label="Home"
                            icon={<AiOutlineHome />} >
                            </NavLink>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a>
                            <NavLink
                            label="About"
                            icon={<AiOutlineInfoCircle />} />
                        </a>
                    </Link>
                </Stack>
            </Drawer>
            <Burger 
            size="sm"
            opened={open} onClick={() => setOpen(o => !o)} />
        </div>
    )
}

export default DrawerMenu