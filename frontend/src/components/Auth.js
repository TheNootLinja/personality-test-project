import React, { useEffect, useState } from 'react'
import {useUser} from "../hooks/User"
import {useRouter} from 'next/router'

const Auth = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        if(user?.authenticatedItem === null) {
            router.push("/");
        } else if (user?.authenticatedItem) {
            setIsLoading(false);
        }
    }, [user])

    if(isLoading){
        return <p>Working on it...</p>
    }
  return (
    <>
        {children}
    </>
  )
}

export default Auth