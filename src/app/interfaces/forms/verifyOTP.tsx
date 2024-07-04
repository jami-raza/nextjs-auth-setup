'use client'
import PrimaryButton from '@/app/components/buttons/PrimaryButton'
import Input from '@/app/components/inputs/input'
import { FormSchemaForgotPasswordType, FormSchemaSignInType, signInValidator } from '@/app/lib/validators/auth'
import { forgotPassword, login } from '@/app/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import OtpInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation'
import TextButton from '@/app/components/buttons/TextButton'

const VerifyOTP = () => {

    const [otp, setOtp] = useState('');
    const [seconds, setSeconds] = useState(60);
    const [disableResendOTP, setDisableResendOTP] = useState(true);
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const type = searchParams.get('type')

    useEffect(() => {
        if (!email || !type) {
            router.push('/signin')
        }
    }, [searchParams])

    useEffect(() => {
        const timerId = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds - 1;
                // if (customLogic) {
                //   customLogic(newSeconds);
                // }
                if (newSeconds <= 0) { // Example logic: when timer reaches 60 seconds
                    clearInterval(timerId);
                    setDisableResendOTP(false)
                    console.log("Timer reaches 60 seconds")
                    //   if (onTimeUp) {
                    //     onTimeUp();
                    //   }
                }
                return newSeconds;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const handleSubmit = () => {

    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Verify OTP
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" onSubmit={handleSubmit}>

                    <div>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props}

                            />}
                            inputStyle={'OtpInputStyle'}
                            inputType='number'
                        />
                    </div>

                    <div>
                        <h1>Timer: {seconds} seconds</h1>
                        <TextButton type='button' label='Resend' disabled={disableResendOTP} />
                    </div>

                    <div>
                        <PrimaryButton type='submit' disabled={otp.length < 4} label={'Verify'} />
                    </div>
                </form>


            </div>
        </div>
    )
}

export default VerifyOTP