import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProfileDropDown() {
    const { user } = useUser()
    if (!user) {
        return null
    }

    return (
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full relative">
            <Image
            src={user.picture ? user.picture : ""}
            alt="Cannot fetch picture"
            layout='fill'
            objectFit='contain'
            quality={100} />
            </div>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
            <Link
            href={`/users/${user?.sub}`}
            className="justify-between">
                Profile
            </Link>
            </li>
            <li>
                <Link href="/api/auth/logout">Logout</Link>
            </li>
        </ul>
        </div>
    )
}