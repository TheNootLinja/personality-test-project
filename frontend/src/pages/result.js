import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Page from '../components/Page'
import Answers from '../components/Answers'
import Diagram from '../components/Diagram'
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import {useUser} from '../hooks/User'
import { groupBy, sumBy } from 'lodash'
import Auth from '../components/Auth'

const USER_TYPE_QUERY = gql`
  query USER_TYPE_QUERY($type: Int!) {
    types(where: {
      type: {
        equals: $type
      }
    }) {
      id
      type
      subheading
      description
    }
  }
`;

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
  const [result, setResult] = useState(0);

  const [getUserAnswers, {data, loading, error}] = useLazyQuery(USER_ANSWER_QUERY, {
    onCompleted: (data) => {
      const groupedAnswers = groupBy(data.answers, (item) => {
        return item.question.type.type
      })
      const res = gradeQuiz(groupedAnswers);
      setResult(res);
    }
  });

  const [getTypeDetails, typeDetails] = useLazyQuery(USER_TYPE_QUERY);

  useEffect(() => {
    if(user?.authenticatedItem?.id) {
      getUserAnswers({
        variables: {
          id: user.authenticatedItem.id
        }
      })
    }
  }, [user]);

  useEffect(() => {
    if(result) {
      getTypeDetails({variables:{type: result}});
    }
  }, [result])

  const spelledOutNumbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

  let highestTypeGrade = 0;
  let highestGrade = 0;

  const gradeQuiz = (groupedAnswers) => {
    // Loop over each item in object
    for (const [key, value] of Object.entries(groupedAnswers)) {
      const typeSum = sumBy(value, item => item.answer);
      if(typeSum > highestGrade) {
        highestGrade = typeSum;
        highestTypeGrade = Number(key);
      }
    }
    return highestTypeGrade;
  }

  return (
    <Auth>
      <Page>
          <div className="white-box">
              <div className="content text-center">
                <div className="page-title leading-none -mt-28">
                <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">Hello</div>
                {typeDetails?.data?.types[0].type && spelledOutNumbers[typeDetails.data.types[0].type - 1]}
                <br/>
                {typeDetails?.data?.types[0].subheading && typeDetails.data.types[0].subheading}
                </div>
                  <div className='max-w-md mx-auto mb-5'>
                    <Diagram result={result}/>
                  </div>
                  <p className="text-left">{typeDetails?.data?.types[0].description && typeDetails.data.types[0].description}</p>
              </div>
          </div>
      </Page>
    </Auth>
  )
}

export default Question