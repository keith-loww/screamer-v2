import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProfileDropDown() {
    const { user } = useUser()

    return (
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full relative">
            <Image
            src={user?.picture}
            alt="Cannot fetch picture"
            layout='fill'
            objectFit='contain'
            quality={100} />
            </div>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
            <a className="justify-between">
                Profile
            </a>
            </li>
            <li>
                <Link href="/api/auth/logout">Logout</Link>
            </li>
        </ul>
        </div>
    )
}