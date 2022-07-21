import Image from "next/image"
import Link from "next/link"
import { getPostItemDate } from "../../../../lib/dateHelper"

import { Comment } from "../../../types"
import LikeDisplay from "./LikeDisplay"

export const CommentItem = ({ comment } : {comment : Comment}) => {
    return (
        <div className='card card-bordered shadow-md hover:shadow-lg w-full'>
            <div className='card-body'>
                <div className="flex flex-row space-x-2">                
                    <Link href={`/users/${comment.author.id}`}>
                        <div className="avatar">
                            <div className="h-14 rounded-full relative hover:brightness-75 ease-linear duration-200">
                                <Image
                                src={comment.author.picture}
                                alt="Cannot Fetch Image"
                                layout='fill' />
                            </div>
                        </div>
                    </Link>
                    <div>
                        <div className='flex space-x-2 items-center'>
                            <Link
                            href={`/users/${comment.author.id}`}
                            className='text-lg font-semibold'>
                                <span className='hover:underline'>{comment.author.nickname.toUpperCase()}</span>                            
                            </Link>
                            <span className='text-secondary'>
                                · {getPostItemDate(new Date(comment.date))}
                            </span>
                        </div>
                        <div className='text-sm'>
                            {comment.content.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <LikeDisplay comment={comment} />
                </div>
            </div>
        </div>
    )
}