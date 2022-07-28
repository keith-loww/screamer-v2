import { AppShell, Blockquote, Button, Center, Stack, TypographyStylesProvider } from '@mantine/core'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import Technologies from '../components/About/Technologies'
import NavBar from '../components/HomePage/NavBar'

const About: NextPage = () => {
    return (<>
        <Head>
            <title>About</title>
        </Head>
        <AppShell
        header={<NavBar />} >
            <TypographyStylesProvider>
                <Center>
                    <Stack className='w-full lg:w-3/5' >
                        <Blockquote cite="- Aristotle...probably">
                            Screaming is better than crying.
                        </Blockquote>
                        <div>
                            <span className='font-semibold'>SCREAMER</span>
                            <span> is a platform for people to share their stories and experiences, but only in full caps.</span>
                        </div>
                        <Center className='w-full'>
                            <Link href='https://github.com/keith-loww/screamer-v2'>
                                <Button
                                className='w-1/3 md:w-1/5'
                                variant='outline'
                                color="gray"
                                leftIcon={<BsGithub />}>
                                    GitHub
                                </Button>
                            </Link>
                        </Center>
                        <Technologies />
                    </Stack>
                </Center>
            </TypographyStylesProvider>
        </AppShell>
    </>)
}

export default About