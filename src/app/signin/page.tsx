import React from 'react'
import SignIn from '../interfaces/forms/signIn'
import { getAuthToken } from '../actions'
import { redirect } from 'next/navigation'

const Page = async () => {
    try {
        const tokens = await getAuthToken()
        console.log(tokens, "TOkens")
        if (tokens.authToken && tokens.refreshToken) {
            redirect('/dashboard')
        }
    } catch (error) {
        console.log(error, "Sign In Page Error")
        redirect('/dashboard')
    }
    return (
        <div>
           <SignIn/>
        </div>
    )
}

export default Page