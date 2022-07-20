import React from 'react'

interface PropTypes {
    deleteHandler: () => void
}

export default function DropdownMenu({deleteHandler} : PropTypes) {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">Click</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={deleteHandler}>Delete Post</a></li>
            </ul>
        </div>
    )
}