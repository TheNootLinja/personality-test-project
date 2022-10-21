import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Page from '../components/Page'
import {useForm} from 'react-hook-form'
import {gql, useMutation} from "@apollo/client"
import {useUser, AUTHENTICATE_USER_QUERY} from "../hooks/User"
import { useRouter } from 'next/router'

// Query for creating a new user
const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
    }
  }
`;

// Query for authenticating a user session
const AUTHENTICATE_USER_MUTATION = gql`
  mutation AUTHENTICATE_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          name
          id
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const Home = () => {

  // using state to track if there has been an error
  const [foundErrors, setFoundErrors] = useState(false);
  // State to lock form if it is in process of submitting
  const [submittingForm, setSubmittingForm] = useState(false);
  // useForm hook
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // Calling our custom useUser() hoolk
  const user = useUser();

  const router = useRouter();

  // Check to see if user has existing session and has already been authenticated
  // Trigger rerun if user object changes
  useEffect(() => {
    console.log('checking the user');
    console.log(user);
    if(user?.authenticatedItem?.id) {
      // redirect user to directions page
      router.push('/directions');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Function to handle what happens when form is submitted
  const onSubmit = async data => {
    setSubmittingForm(true);
    await signUpUser(data);
    setSubmittingForm(false);
  };

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [checkUsernamePassword] = useMutation(AUTHENTICATE_USER_MUTATION);

  const signUpUser = async (data) => {
    try{
    await createUser({
      variables: {
        "data": {
          "name": data.name,
          "email": data.email,
          "password": data.password
        }
      }
    });
    await authenticateUser(data);
    // If error setFoundErrors is true
  } catch {
    console.log("#1")
    setFoundErrors(true);
  }
  }
// If user is successfully created, authenticate them
// using entered credentials
const authenticateUser =  async (data) => {
    try {
    // If successfull, send them to directions page
    const loggedInUser = await checkUsernamePassword({
      variables: {
        "email": data.email,
        "password": data.password
      },
      refetchQueries: [
        { query: AUTHENTICATE_USER_QUERY }
      ]
    });

    const token = loggedInUser.data.authenticateUserWithPassword.sessionToken;

    // If successfully authenticated
    if(token) {
      localStorage.setItem("ENNEAGRAM_SESSION", token);
    } else {
      console.log("#2")
      setFoundErrors(true);
    }
    router.push('/directions');
  } catch {
    setFoundErrors(true);
  }
}



  return (
    <Page>
        <div className="white-box">
          <h1 className="page-title -mt-32">
            <span className="font-handwriting text-7xl block -translate-x-10">Free</span>
             Enneagram Assessment
             </h1>

          <h2 className="font-sans uppercase text-primary tracking-wider text-lg mb-4">Create an Account</h2>
          { foundErrors && <div className="error">FOUND SOME ERRORS SIRE!</div>}
          <form action="" onSubmit={handleSubmit(onSubmit)} className="relative pb-12 lg:pb-4">
            <fieldset disabled={submittingForm} className="lg:grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" {...register("name", {required: true})}/>
              {errors.name && <div className="error">Frist name is required</div >}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" {...register("email", {required: true})}/>
              {errors.email && <div className="error">Email is required</div >}
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" {...register("password", {required: true})}/>
            {errors.password && <div className="error">Password is required</div >}
            </div>
            <div className="col-span-3">
              <input type="checkbox" name="terms" id="terms" {...register("terms", {required: true})}/>
              {errors.terms && <div className="error">Terms is required</div >}
              <label htmlFor="terms">
                I agree to your {" "}
                <Link href="/terms-and-conditions"><a>terms and conditions</a></Link>
              </label>
            </div>
            </fieldset>
            <button type="submit" role="submit" className="button z-10 absolute -bottom-12 left-1/2 md:left-auto md:-right-0 -translate-x-1/2 md:translate-x-0"><span className="button-text">Submit</span></button>
          </form>
        </div>
            <div className="absolute md:relative bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:pt-6"><Link href="/what-is"><a>WHAT IS THE ENNEAGRAM?</a></Link></div>
    </Page>
  )
}

export default Home