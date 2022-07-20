import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

interface PropTypes {
    deleteHandler: () => void
}

export default function DropdownMenu({deleteHandler} : PropTypes) {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-full m-1">
                <BsThreeDots />
            </label>
            <ul tabIndex={0} className="dropdown-content border menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={deleteHandler}>Delete Post</a></li>
            </ul>
        </div>
    )
}