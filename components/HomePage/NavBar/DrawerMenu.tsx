import { Burger, Button, Drawer, Stack } from '@mantine/core'
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
                    <Button variant="unstyled" leftIcon={<AiOutlineHome />} className="flex justify-start hover:brightness-125" >
                        <Link href="/">
                            Home
                        </Link>
                    </Button>
                    <Button variant="unstyled" leftIcon={<AiOutlineInfoCircle />} className="flex justify-start hover:brightness-125" >
                        <Link href="/about">
                            About
                        </Link>
                    </Button>
                </Stack>
            </Drawer>
            <Burger 
            size="sm"
            opened={open} onClick={() => setOpen(o => !o)} />
        </div>
    )
}

export default DrawerMenu