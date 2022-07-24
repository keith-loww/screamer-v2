import { UserProfile } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Avatar as ManatineAvatar} from '@mantine/core'

interface Props {
    user: UserProfile
}

const Avatar = ({ user }: Props) => {
    if (!user || !user.sub) return null

    return (
        <Link href={`/users/${user.sub}`}>
            <ManatineAvatar
                className='rounded-full'
                size="md"
                src={user.picture}
            />
        </Link>
    )
}

export default Avatar