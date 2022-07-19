import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'
import ProfileDropDown from './ProfileDropdown';

export default function NavBar() : JSX.Element {
    const {user} = useUser();

    return (
        <div className='navbar shadow-md' >
            <div className='navbar-start'>
                <Link href="/">
                <a className="btn btn-ghost text-xl space-x-2">
                    <IoMegaphoneSharp className='hover:animate-ping' />
                    <span>SCREAMER V2</span>
                </a>
                </Link>
            </div>
            <div className="navbar-end">
                {user ? 
                <ProfileDropDown />
                : <LoginBtn />}
            </div>
        </div>
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