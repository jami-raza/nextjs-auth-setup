import Link from 'next/link';
import React from 'react'
import { FaDollarSign } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";

interface IAccountCard {
    type: 'empty' | 'filled',
    link: string;
}

const AccountCard = ({ type, link }: IAccountCard) => {
    return (



        <div className={`p-4 w-[100%] max-w-[300px] bg-white shadow-md ${type === 'empty' && 'border-2 border-primary border-dashed'}`}>
            <Link href={{
                pathname: type === 'empty' ? '' : link, query:
                    type === 'empty' ? { modal: 'add-account' } : {}
            }} >
                {type === "filled" ?
                    <>

                        <div className='mb-2'>
                            <h4 className='font-medium text-gray-800'>
                                HBL Finance Account
                            </h4>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <p className='text-gray-700 text-sm'>
                                Balance
                            </p>
                            <h4 className='flex items-center font-semibold text-lg'><FaDollarSign />500</h4>
                        </div>
                    </> :

                    <div className='flex flex-col gap-1 space-x-2 items-center justify-center h-[100%]'>
                        <IoMdAddCircleOutline className='h-8 w-8 text-primary' />
                        <h4 className='font-medium text-gray-700'>
                            Add Account
                        </h4>
                    </div>
                }
            </Link>
        </div>

    )
}

export default AccountCard;