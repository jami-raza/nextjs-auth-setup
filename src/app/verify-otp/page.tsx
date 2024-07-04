import React from 'react'
import SignIn from '../interfaces/forms/signIn'
import { getAuthToken } from '../actions'
import { redirect } from 'next/navigation'
import VerifyOTP from '../interfaces/forms/verifyOTP'

const Page = async () => {
    
    return (
        <div>
           <VerifyOTP/>
        </div>
    )
}

export default Page