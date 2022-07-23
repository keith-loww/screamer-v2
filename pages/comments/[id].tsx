import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Comment } from '../../components/types'
import { stringifyAndParse } from '../../lib/jsonhelper'
import { isString } from '../../lib/typeguards'
import { getCommentForPage } from '../api/comments/[id]'

interface PropTypes {
    comment: Comment
}

const CommentPage : NextPage<PropTypes> = ({ comment }: PropTypes) => {
    console.log(comment)
    return (<>
        <Head>
            <title>{comment.id}</title>
        </Head>
        <NavBar />

        <Footer />
    </>)
}

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) throw new Error("no id given")
    if (!isString(params.id)) throw new Error("id is not a string")

    const comment = await stringifyAndParse(getCommentForPage(params.id))
    return { props: { comment } }
}

export default CommentPage