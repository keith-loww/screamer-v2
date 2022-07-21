import { Comment } from "../../types"

// create jsx element commentItem
export const CommentItem = ({ comment } : {comment : Comment}) => {
    return (
        <div className='flex flex-col space-y-2'>
            <div className='flex flex-col space-y-2'>
                <Link
                href={`/users/${comment.author.id}`} >
                    <a className='text-xl font-semibold hover:underline'>
                        {comment.author.nickname.toUpperCase()}
                    </a>
                </Link>
                <span className='text-secondary'>
                    {getPostPageDate(new Date(comment.date))}
                </span>
            </div>
            <div className='text-2xl'>
                {comment.content}
            </div>
        </div>
    )
}