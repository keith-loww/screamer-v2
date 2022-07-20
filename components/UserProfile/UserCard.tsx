import React from 'react'
import { User } from '../types'

export default function UserCard({user} : {user : User}) {
    return (
        <div className='card bg-primary w-full md:w-3/5 xl:w-1/3'>
            <div className='card-body'>
                <div className='avatar'></div>
            </div>
        </div>
    )
}