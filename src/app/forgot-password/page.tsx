import React from 'react'
import SignIn from '../interfaces/forms/signIn'
import { getAuthToken } from '../actions'
import { redirect } from 'next/navigation'
import ForgotPassword from '../interfaces/forms/forgotPassword'

const Page = async () => {
    
    return (
        <div>
           <ForgotPassword/>
        </div>
    )
}

export default Page