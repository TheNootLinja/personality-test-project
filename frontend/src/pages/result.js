import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Page from '../components/Page'
import Answers from '../components/Answers'
import Diagram from '../components/Diagram'
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import {useUser} from '../hooks/User'

// const TYPES_QUERY = gql`query TYPES_QUERY {
//   types {
//     id
//     type
//     subheading
//   }
// }`;

const USER_ANSWER_QUERY = gql`
  query USER_ANSWER_QUERY($id: ID!) {
    answers(where: {
      user: {
        id: {
          equals: $id
        }
      }
    }) {
      answer
      question {
        type {
          type
        }
      }
    }
  }
`;

const Question = () => {
  // const {data, loading, error} = useQuery(TYPES_QUERY);
  const user = useUser();
  const [getUserAnswers, {data, loading, error}] = useLazyQuery(USER_ANSWER_QUERY);

  useEffect(() => {
    if(user?.authenticatedItem?.id) {
      getUserAnswers({
        variables: {
          id: user.authenticatedItem.id
        }
      })
    }
  }, [])

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