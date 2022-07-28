import { useUser } from '@auth0/nextjs-auth0'
import { AppShell, Timeline } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import CommentCard from '../../components/CommentPage/CommentCard'
import Replies from '../../components/CommentPage/Replies'
import ReplyToCard from '../../components/CommentPage/ReplyToCard'
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
    const router = useRouter()
    const { user } = useUser()

    return (<>
        <Head>
            <title>{comment.author.nickname.toUpperCase()}&#39;s COMMENT</title>
        </Head>
        <AppShell
        fixed
        header={<NavBar />}
        >
            <div className='flex justify-center'>
                <div className='w-full md:w-3/5 xl:w-2/5'>
                    <Timeline
                    bulletSize={12}
                    color="gray"
                    active={1}>
                        <Timeline.Item>
                            <ReplyToCard
                            type={comment.replyToType}
                            replyTo={comment.replyTo} />
                        </Timeline.Item>
                        <Timeline.Item>
                            <div>
                                <CommentCard
                                comment={comment} />
                                <Replies comments={comment.comments} />
                            </div>
                        </Timeline.Item>
                    </Timeline>
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