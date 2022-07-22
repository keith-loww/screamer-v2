import { User } from 'auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    user: User
}

const Avatar = ({ user }: Props) => {
    if (!user || !user.sub) return null

    return (
        <Link href={`/users/${user.sub}`}>
            <div className="avatar">
                <div className="h-14 rounded-full relative hover:brightness-75 ease-linear duration-200">
                    <Image
                    src={user.picture}
                    alt="Cannot Fetch Image"
                    layout='fill' />
                </div>
            </div>
        </Link>
    )
}

export default Avatar