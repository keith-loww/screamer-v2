import type { NextPage } from 'next'
import Head from 'next/head'
import { IoMegaphoneSharp } from "react-icons/io5"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <html data-theme="business" ></html>
        <title>Screamer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='navbar shadow-md'>
        <a className="btn btn-ghost text-xl space-x-2">
          <IoMegaphoneSharp />
          <span>SCREAMER V2</span>
        </a>
      </div>
    </>
  )
}

export default Home
