import React, { useEffect } from 'react'
import { getAuthToken } from '@/actions'
import { redirect } from 'next/navigation'
import { getDashboard } from '@/services/dashboard'
import AccountCard from '@/components/cards/account-card'
import Modal from '@/components/modal'
import AddAccount from '../interfaces/forms/addAccount'
type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};
const Page = ({ searchParams }: SearchParamProps) => {
    const show = searchParams?.modal;
    console.log(show, "SHOW")

    // const getUser = async()=>{
    //     try {
    //         const user = await getDashboard()
    //         console.log(user, "USER")
    //     } catch (error) {
    //         console.log(error, "ERROR")
    //         redirect("/signin")

    //     }
    // } 
    // getUser()
    // useEffect(() => {
    //     getUser()
    // }, [])

    return (
        <div className='flex flex-wrap gap-4'>
            <AccountCard link='' type='filled' />
            <AccountCard link='' type='filled' />
            <AccountCard link='' type='filled' />
            <AccountCard link='' type='filled' />
            <AccountCard link='' type='empty' />
            {show === "add-account" && <Modal >
                <AddAccount/>
            </Modal>
               
            }
        </div>
    )
}

export default Page