import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Comment } from '../../components/types'
import { getCommentForPage } from '../api/comments/[id]'

interface PropTypes {
    comment: Comment
}

const CommentPage : NextPage = ({ comment }: PropTypes) => {
    console.log(comment)
    return (
        <div>
            <h1>{comment.content}</h1>
            <p>{comment.id}</p>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) throw new Error("no id")

    const comment = await getCommentForPage(params.id)
    return { props: { comment } }
}

export default CommentPage