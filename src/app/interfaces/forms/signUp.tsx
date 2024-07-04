import PrimaryButton from '@/app/components/buttons/PrimaryButton'
import Input from '@/app/components/inputs/input'
import React from 'react'

const SignUp = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST">
                    <Input
                        id='name'
                        label='Name'
                        name='name'
                        required={true}
                        type='text'
                    />
                    <Input
                        id='email'
                        label='Email'
                        name='email'
                        required={true}
                        type='email'
                    />
                    <Input
                        id='password'
                        label='Password'
                        name='password'
                        required={true}
                        type='password'
                    />


                    <div>
                        <PrimaryButton type='submit' label='Register'/>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignUp