'use client'
import { googleLogin } from '@/actions';
import PrimaryButton from '@/components/buttons/PrimaryButton'
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Input from '@/components/inputs/input'
import Separator from '@/components/separator/separator';
import { FormSchemaSignUpType, signUpValidator } from '@/lib/validators/auth';
import { signUp } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const AddAccount = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaSignUpType>({
        resolver: zodResolver(signUpValidator, {}, { raw: true }),
        defaultValues: {

        },
        // mode: "onBlur" || "onSubmit"
    });

    const router = useRouter()

    const onSubmit: SubmitHandler<FormSchemaSignUpType> = async (data) => {

        console.log(data, "DATA")
        try {
            const res = await signUp({ email: data.email, password: data.password, fullName: data.fullName })
            console.log(res, "Response")
            router.push('/dashboard')
            // const setCookieHeader = res.headers['set-cookie'];

            // // You can now store the cookie or use it for subsequent requests
            // console.log('Cookie received:', setCookieHeader);
        } catch (error) {
            // console.log(errors, "Error in on submit")
            if (axios.isAxiosError(error)) {
                // do whatever you want with native error
                console.log(errors, "Error in on submit")
                enqueueSnackbar({ message: error?.response?.data?.error, variant: 'error', anchorOrigin: { horizontal: "center", vertical: "bottom" } })
            }

        }
        // await fetch('/api/v1/form', { body: formData, method: 'POST' });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center">
            <SnackbarProvider />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add Account
                </h2>
               
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('fullName')}
                        error={errors.fullName?.message}
                        label='Name'
                        type='text'
                    />
                    <Input
                        label='Email'
                        {...register('email')}
                        error={errors.email?.message}
                        type='email'
                    />
                    <Input
                        label='Password'
                        {...register('password')}
                        error={errors.password?.message}
                        type='password'
                    />



                    <div>


                        <div className='mt-5'>
                            <PrimaryButton type='submit' disabled={isSubmitting} label={isSubmitting ? 'Registering...' : 'Register'} />
                        </div>
                        <Separator>
                            <span className="text-sm text-gray-500">Already account?</span>

                        </Separator>
                        <div className='mt-5'>
                            <SecondaryButton type='button' label={'Sign In'}
                                onClick={() => router.push('signin')}
                            />

                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAccount