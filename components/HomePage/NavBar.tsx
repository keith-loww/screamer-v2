import Link from 'next/link'
import React from 'react'
import { IoMegaphoneSharp } from 'react-icons/io5'

export default function NavBar() {
    return (
        <div className='navbar shadow-md'>
            <Link href="/">
            <a className="btn btn-ghost text-xl space-x-2">
                <IoMegaphoneSharp />
                <span>SCREAMER V2</span>
            </a>
            </Link>
        </div>
    )
}