'use client'
import PrimaryButton from '@/app/components/buttons/PrimaryButton'
import Input from '@/app/components/inputs/input'
import { FormSchemaSignInType, signInValidator } from '@/app/lib/validators/auth'
import { login } from '@/app/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaSignInType>({
        resolver: zodResolver(signInValidator, {}, { raw: true }),
        defaultValues: {

        },
        // mode: "onBlur" || "onSubmit"
    });

    const router = useRouter()

    const onSubmit: SubmitHandler<FormSchemaSignInType> = async (data) => {

        console.log(data, "DATA")
        try {
            const res = await login({ email: data.email, password: data.password })
            console.log(res, "Response")
            router.push('/dashboard')
            // const setCookieHeader = res.headers['set-cookie'];

            // // You can now store the cookie or use it for subsequent requests
            // console.log('Cookie received:', setCookieHeader);
        } catch (error) {
            console.log(error, "Error in on submit")
        }
        // await fetch('/api/v1/form', { body: formData, method: 'POST' });
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('email')}
                        error={errors.email?.message}
                        label='Email'
                        required
                    />
                    <Input
                        {...register('password')}
                        error={errors.password?.message}
                        label='Password'
                        required={true}
                        type='password'
                    />
                    <div>
                        <Link className="text-primary text-sm" href={'/forgot-password'}>Forgot Password?</Link>

                    <div className='mt-5'>
                        <PrimaryButton type='submit' disabled={isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} />
                    </div>
                    </div>

                </form>


            </div>
        </div>
    )
}

export default SignIn