import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Head from 'next/head'
import Footer from '../components/HomePage/Footer'
import NavBar from '../components/HomePage/NavBar'
import NewPostForm from '../components/HomePage/NewPostForm'
import PostsDisplay from '../components/HomePage/PostsDisplay'
import { Post } from '../components/types'

const Home = ({posts} : {posts : Post[]}) => {
  const {user} = useUser();
  
  return (
    <>
      <Head>
        <html data-theme="business" ></html>
        <title>Screamer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className='p-2 flex flex-col items-center'>{user ? <NewPostForm /> : null}</div>
      <PostsDisplay
      posts={posts} />

      <Footer />
    </>
  )
}


export async function getServerSideProps() {
  const { data : postData  } = await axios.get("http://localhost:3000/api/posts");
  const posts = postData.data
  return {
    props: {posts}
  }
}

export default Home
