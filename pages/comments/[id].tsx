import { GetServerSideProps } from 'next'
import React from 'react'
import { Comment } from '../../components/types'

interface PropTypes {
    comment: Comment
}

const CommentPage = ({ comment }: PropTypes) => {
    return (
        <div>
            <h1>{comment.content}</h1>
            <p>{comment.id}</p>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) throw new Error("no id")

    const comment = await fetch(`/api/comments/${params.id}`).then(res => res.json())
    return { props: { comment } }
}

export default CommentPage