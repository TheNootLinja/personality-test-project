import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Page from '../components/Page'
import Answers from '../components/Answers'
import {gql, useLazyQuery, useMutation} from "@apollo/client"
import {useRouter} from 'next/router'
import {useUser} from '../hooks/User'

const QUESTION_QUERY = gql`
  query QUESTION_QUERY($id: ID) {
    questions(where: {
      answer: {
        none: {
          AND: [
            {
              user: {
                id: {
                  equals: $id
                }
              }
            }
          ]
        }
      }
    }
    ) {
      question
      id
    }
    questionsCount
  }
`;

const ANSWER_QUESTION_MUTATION = gql`
  mutation ANSWER_QUESTION_MUTATION($userId: ID, $questionId: ID, $answer: Int) {
    createAnswer(data: {
      answer: $answer
      user: {connect: {id: $userId}}
      question: {connect: {id : $questionId}}
    }) {
      id
    }
  }
`;

const Question = () => {
  const user = useUser();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [curSpot, setCurSpot] = useState(0);

  const shuffle = (array) => {
    const arrayForSort = [...array];
    return arrayForSort.sort(() => 0.5 - Math.random())
  }

  const [getQuestions, {data, loading, error}] = useLazyQuery(QUESTION_QUERY, {
    onCompleted: (data) => {
      // Check to see if any questions left
      if(data.questions && (data.questions.length > 0)) {
        setQuestions(shuffle(data.questions))
      } else {
        router.push('/result');
      }
    }
  })

  const [addAnswers, addAnswerMutationResult] = useMutation(ANSWER_QUESTION_MUTATION, {
    onCompleted: () => {
      console.log("testing")
      const newSpot = curSpot + 1;
      if(newSpot < data.questions.length) {
        setCurSpot(newSpot);
        setQuestionNumber(prevValue => prevValue + 1)
      } else {
        router.push('/result')
      }
    }
  })

  const submitAnswer = (e) => {
    const answerValue = e.currentTarget.value;
    addAnswers({
      variables: {
        "userId": user.authenticatedItem.id,
        "questionId": questions[curSpot].id,
        "answer": parseInt(answerValue)
      }
    });
  }

  useEffect(() => {
    if (data?.questionsCount) {
      const questionNum = data.questionsCount - data.questions.length + 1;
      setQuestionNumber(questionNum);
    }
  }, [data]);

  useEffect(() => {
    if(user?.authenticatedItem?.id) {
      getQuestions({
        variables: {
          id: user.authenticatedItem.id
        }
      });
    }
  }, [user])

  return (
    <Page>
        <div className="white-box">
            <div className="content text-center">
              <div className="font-display text-10xl leading-none -mt-28">
              <Image src="/img/number-sign.svg" width={72} height={109}/>
              { questionNumber }
              </div>
                <p>{questions && questions[curSpot]?.question }</p>
                <div className="mb-24 sm:mb-auto">
                    <Answers  className="bottom-0 p-2" submitAnswer = {submitAnswer}/>
                </div>
            </div>
        </div>
    </Page>
  )
}

export default Question