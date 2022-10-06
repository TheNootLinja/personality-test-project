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
              <div className="font-display text-10xl leading-none -mt-28">
              <Image src="/img/number-sign.svg" width={72} height={109}/>
              1
              </div>
                <p>I am very perceptive and I often find myself acting as a guardian, vigilant about keeping myself and others safe.</p>
                <div className="mb-24 sm:mb-auto">
                    <Answers  className="bottom-0 p-2"/>
                </div>
            </div>
        </div>
    </Page>
  )
}

export default Question