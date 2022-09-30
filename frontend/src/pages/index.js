import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="bg-page-background-mobile min-h-screen bg-cover bg-fixed">
      <Head>
        <title>What's ur #?</title>
      </Head>
      <main className="px-6">

        {/* Logo Here */}
        <div className="w-full text-center pb-8">
          <div className="border-l-1 border-black h-32 inline-block">
            <div className="absolute -translate-x-1/2 translate-y-1/2">
              <Image src="/img/logo.svg" height={68} width={68} alt="logo"/>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-6">
          <h1 className="font-display text-5xl -mt-32 mb-2">
            <span className="font-handwriting text-7xl block -translate-x-10">Free</span>
             Enneagram Assessment
             </h1>

          <h2 className="font-sans uppercase text-primary tracking-wider text-lg mb-4">Create an Account</h2>

          <form action="" className="relative pb-12">
            <label htmlFor="name">First Name</label>
            <input type="text" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>
            <input type="checkbox" name="terms" id="terms"/>
            <label htmlFor="terms">
              I agree to your {" "}
              <Link href="/"><a>terms and conditions</a></Link>
            </label>

            <button type="submit" role="submit" className="h-12 w-44 bg-primary font-handwriting block absolute -bottom-12 left-1/2 -translate-x-1/2"><span className="text-6xl relative -top-2">Submit</span></button>
          </form>
            <div className="absolute bottom-2 left-0 w-full text-center"><Link href="/"><a>WHAT IS THE ENNEAGRAM?</a></Link></div>
        </div>
      </main>
    </div>
  )
}

export default Home