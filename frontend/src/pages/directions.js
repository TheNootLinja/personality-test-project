import React from 'react'
import Link from 'next/link'
import Page from '../components/Page'
import Answers from '../components/Answers'
import Auth from '../components/Auth'

const Directions = () => {
  return (
    <Auth>
      <Page>
          <div className="white-box">
              <div className="content text-center">
                  <h3 className="uppercase tracking-wider mb-2">Instructions</h3>
                  <h1 className="page-title">Its Easy.</h1>
                  <p>Answer the following questions with:</p>
                  <div className="mb-24 sm:mb-auto">
                      <Answers disabled={true}/>
                  </div>
                  <div className="button relative mx-auto top-20 sm:top-20">
                  <Link href="/question"><a className="button-text no-underline">Start</a></Link>
                  </div>
              </div>
          </div>
      </Page>
    </Auth>
  )
}

export default Directions