import React, { useEffect } from 'react'
import { getAuthToken } from '../actions'
import { redirect } from 'next/navigation'
import { getDashboard } from '../services/dashboard'

const Page = () => {

    const getUser = async()=>{
        try {
            const user = await getDashboard()
            console.log(user, "USER")
        } catch (error) {
            console.log(error, "ERROR")
            redirect("/signin")
    
        }
    } 
    getUser()
    // useEffect(() => {
    //     getUser()
    // }, [])

    return (
        <div>
            Hello world
        </div>
    )
}

export default Page