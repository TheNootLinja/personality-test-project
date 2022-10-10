import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Page from '../components/Page'
import Answers from '../components/Answers'
import Diagram from '../components/Diagram'
import {gql, useQuery} from "@apollo/client"

const TYPES_QUERY = gql`query TYPES_QUERY {
  types {
    id
    type
    subheading
  }
}`;

const Question = () => {

  const {data, loading, error} = useQuery(TYPES_QUERY);
  console.log(data);

  return (
    <Page>
        <div className="white-box">
            <div className="content text-center">
              <div className="page-title leading-none -mt-28">
              <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">Hello</div>
              Three
              </div>
                <div className='max-w-md mx-auto mb-5'>
                  <Diagram />
                </div>
                <p className="text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus cum voluptatibus a at iure facere illo nihil corporis praesentium, animi debitis aspernatur ipsam commodi nesciunt inventore quibusdam quisquam labore numquam!</p>
            </div>
        </div>
    </Page>
  )
}

export default Question