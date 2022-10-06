import React from 'react'
import Link from 'next/link'
import Page from '../components/Page'
import Answers from '../components/Answers'

const Directions = () => {
  return (
    <Page>
        <div className="white-box">
            <div className="content text-center">
                <h3 className="uppercase tracking-wider mb-2">Instructions</h3>
                <h1 className="page-title">It's Easy.</h1>
                <p>Answer the following questions with:</p>
                <div className="mb-24 sm:mb-auto">
                    <Answers />
                </div>
                <div className="button relative mx-auto top-20 sm:top-20">
                <Link href="/question"><a className="button-text no-underline">Start</a></Link>
                </div>
            </div>
        </div>
    </Page>
  )
}

export default Directions