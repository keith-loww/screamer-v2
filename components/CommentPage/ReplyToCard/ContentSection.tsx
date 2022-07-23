import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPostItemDate } from '../../../lib/dateHelper'
import { ReplyTo } from '../../types'

interface PropTypes {
    replyTo: ReplyTo
}

const ContentSection = ({ replyTo }: PropTypes) => {
    return (
        <div className='flex flex-row space-x-2'>
            <div>
                <Link
                href={`/users/${replyTo.author.id}`} >
                    <div className='avatar'>
                        <div className='relative rounded-full h-16 hover:brightness-75'>
                            <Image
                            src={replyTo.author.picture}
                            alt="could not load avatar"
                            layout='fill'
                             />
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col'>
                <div className='space-x-2'>
                    <span className='font-semibold hover:underline'>
                        {replyTo.author.nickname.toUpperCase()}
                    </span>
                    <span className='text-secondary'>· {getPostItemDate(new Date(replyTo.date))}</span>
                </div>
                <span>
                    {replyTo.content}
                </span>
            </div>
        </div>
    )
}

export default ContentSection