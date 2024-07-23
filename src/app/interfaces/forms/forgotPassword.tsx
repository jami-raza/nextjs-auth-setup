'use client'
import PrimaryButton from '@/app/components/buttons/PrimaryButton'
import Input from '@/app/components/inputs/input'
import { FormSchemaForgotPasswordType, forgetPasswordValidator } from '@/app/lib/validators/auth'
import { forgotPassword, login } from '@/app/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaForgotPasswordType>({
        resolver: zodResolver(forgetPasswordValidator, {}, { raw: true }),
        defaultValues: {

        },
        // mode: "onBlur" || "onSubmit"
    });

    const router = useRouter()

    const onSubmit: SubmitHandler<FormSchemaForgotPasswordType> = async (data) => {

        console.log(data, "DATA")
        try {
            const res = await forgotPassword({ email: data.email })
            console.log(res, "Response")
            router.push(`/verify-otp?email=${data.email}&type=ForgotPassword`)
            // const setCookieHeader = res.headers['set-cookie'];

            // // You can now store the cookie or use it for subsequent requests
            // console.log('Cookie received:', setCookieHeader);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // do whatever you want with native error
                console.log(errors, "Error in on submit")
                enqueueSnackbar({ message: error?.response?.data?.error, variant: 'error',anchorOrigin:{horizontal:"center", vertical:"bottom"} })
            }
            console.log(error, "Error in on submit")
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
                    Forgot Password
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


                    <div>
                        <PrimaryButton type='submit' disabled={isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} />
                    </div>
                </form>


            </div>
        </div>
    )
}

export default ForgotPassword