import { getSession, useUser } from '@auth0/nextjs-auth0'
import { AppShell, Divider } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/HomePage/NavBar'
import NewPostForm from '../components/HomePage/NewPostForm'
import PostsDisplay from '../components/HomePage/PostsDisplay'
import { Post, UserData } from '../components/types'
import dbConnect from '../lib/dbConnect'
import { stringifyAndParse } from '../lib/jsonhelper'
import { getPostsWithAuthor } from './api/posts'
import { getUser } from './api/users/[id]'

interface PropTypes {
  userData? : UserData,
  posts: Post[]
}

const Home : NextPage<PropTypes> = ({ posts, userData } : PropTypes) => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>SCREAMER</title>
        <meta name="description" content="A place to SCREAM YOUR THOUGHTS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
      fixed
      header={<NavBar />}
      >
        <div className='flex justify-center'>
          <div className='w-full md:w-3/5 xl:w-2/5'>
            <div className='p-2 flex flex-col items-center'>
              {(user && userData)
                ? <NewPostForm userData={userData} />
                : null}
            </div>
            <Divider my="xl" />
            <PostsDisplay
            posts={posts} />
          </div>
        </div>
      </AppShell>    
    </>
  )
}


export const getServerSideProps : GetServerSideProps = async (context) => {
  await dbConnect()
  const posts = JSON.parse(JSON.stringify(await getPostsWithAuthor()))
  const session = await getSession(context.req, context.res)
  if (!session) return { props: { posts } }
  const userData = stringifyAndParse(await getUser(session.user.sub))

  return {
    props: {posts, userData}
  }
}

export default Home
