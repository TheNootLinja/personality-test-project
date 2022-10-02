import React from 'react'
import Link from 'next/link'
import Page from '../components/Page'

const Home = () => {
  return (
    <Page>
        <div className="white-box">
          <h1 className="page-title -mt-32">
            <span className="font-handwriting text-7xl block -translate-x-10">Free</span>
             Enneagram Assessment
             </h1>

          <h2 className="font-sans uppercase text-primary tracking-wider text-lg mb-4">Create an Account</h2>

          <form action="" className="relative pb-12 lg:pb-4 lg:grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>
            </div>
            <div className="col-span-3">
              <input type="checkbox" name="terms" id="terms"/>
              <label htmlFor="terms">
                I agree to your {" "}
                <Link href="/terms-and-conditions"><a>terms and conditions</a></Link>
              </label>
            </div>
            <button type="submit" role="submit" className="button z-10 absolute -bottom-12 left-1/2 md:left-auto md:-right-0 -translate-x-1/2 md:translate-x-0"><span className="button-text">Submit</span></button>
          </form>
        </div>
            <div className="absolute md:relative bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:pt-6"><Link href="/what-is"><a>WHAT IS THE ENNEAGRAM?</a></Link></div>
    </Page>
  )
}

export default Home