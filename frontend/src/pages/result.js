import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Page from '../components/Page'
import Answers from '../components/Answers'

const Question = () => {
  return (
    <Page>
        <div className="white-box">
            <div className="content text-center">
              <div className="page-title leading-none -mt-28">
              <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">Hello</div>
              Three
              </div>
                <p className="text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus cum voluptatibus a at iure facere illo nihil corporis praesentium, animi debitis aspernatur ipsam commodi nesciunt inventore quibusdam quisquam labore numquam!</p>
            </div>
        </div>
    </Page>
  )
}

export default Question