'use client'
import { userLogout } from '@/actions'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Input from '@/components/inputs/input'
import { FormSchemaResetPasswordType, resetPasswordValidator } from '@/lib/validators/auth'
import { login, resetPassword } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

const NewPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaResetPasswordType>({
        resolver: zodResolver(resetPasswordValidator, {}, { raw: true }),
        defaultValues: {

        },
        // mode: "onBlur" || "onSubmit"
    });

    const router = useRouter()

    const onSubmit: SubmitHandler<FormSchemaResetPasswordType> = async (data) => {

        console.log(data, "DATA")
        try {
            const res = await resetPassword({ confirmPassword: data.confirmPassword, password: data.password })
            console.log(res, "Response")
            await userLogout()
            router.push('/signin')
            // const setCookieHeader = res.headers['set-cookie'];

            // // You can now store the cookie or use it for subsequent requests
            // console.log('Cookie received:', setCookieHeader);
        } catch (error) {
            console.log(error, "Error in on submit")
            if (axios.isAxiosError(error)) {
                // do whatever you want with native error
                enqueueSnackbar({ message: error?.response?.data?.error, variant: 'error',anchorOrigin:{horizontal:"center", vertical:"bottom"} })
            }
        }
        // await fetch('/api/v1/form', { body: formData, method: 'POST' });
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <SnackbarProvider />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>


                    <Input
                        {...register('password')}
                        error={errors.password?.message}
                        label='Password'
                        required={true}
                        type='password'
                    />
                    <Input
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                        label='Confirm Password'
                        required={true}
                        type='password'
                    />
                    <div className='mt-5'>
                        <PrimaryButton type='submit' disabled={isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} />
                    </div>


                </form>


            </div>
        </div>
    )
}

export default NewPassword