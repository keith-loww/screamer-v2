import { useUser } from '@auth0/nextjs-auth0'
import { AppShell } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import ReplyToCard from '../../components/CommentPage/ReplyToCard'
import Footer from '../../components/HomePage/Footer'
import NavBar from '../../components/HomePage/NavBar'
import { Comment } from '../../components/types'
import dbConnect from '../../lib/dbConnect'
import { stringifyAndParse } from '../../lib/jsonhelper'
import { isString } from '../../lib/typeguards'
import { getCommentForPage } from '../api/comments/[id]'

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
        <AppShell
        header={<NavBar />}
        footer={<Footer />} >
            <div className='flex justify-center'>
                <div className='w-1/3'>
                    <ReplyToCard
                        type={comment.replyToType}
                        replyTo={comment.replyTo}
                    />
                </div>
            </div>
        </AppShell>
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