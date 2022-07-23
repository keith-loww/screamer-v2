import { useUser } from '@auth0/nextjs-auth0'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Comment } from '../../components/types'
import dbConnect from '../../lib/dbConnect'
import { stringifyAndParse } from '../../lib/jsonhelper'
import { isString } from '../../lib/typeguards'
import { getComment, getCommentForPage } from '../api/comments/[id]'

interface PropTypes {
    comment: Comment
}

const CommentPage : NextPage<PropTypes> = ({ comment }: PropTypes) => {
    console.log(comment)
    const router = useRouter()
    const { user } = useUser()

    return (<>
        <Head>
            <title>{comment.id}</title>
        </Head>
        <NavBar />
            {comment.id}
        <Footer />
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    await dbConnect ();
    if (!params || !params.id) throw new Error("no id given")
    if (!isString(params.id)) throw new Error("id is not a string")

    const comment = stringifyAndParse(await getCommentForPage(params.id))
    if (!comment) throw new Error("no comment found")
    return { props: { comment } }
}

export default CommentPage