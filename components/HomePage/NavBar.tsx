import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'

export default function NavBar() {
    return (
        <div className='navbar shadow-md' >
            <div className='navbar-start'>
                <Link href="/">
                <a className="btn btn-ghost text-xl space-x-2">
                    <IoMegaphoneSharp />
                    <span>SCREAMER V2</span>
                </a>
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/login">
                    <a className="btn">LOGIN</a>
                </Link>
            </div>
        </div>
    )   
}