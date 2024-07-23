import axios from "axios";
import { axiosServerInstance } from "./axiosSerInstance";
import { axiosClientInstance } from "./axiosClientInstance";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axios.post(
    `/api/auth/local/signin`,
    { email, password },
    {
      withCredentials: true,
    }
  );

  return response;
}

export async function forgotPassword({ email }: { email: string }) {
  const response = await axios.post(
    `/api/auth/local/forgot-password`,
    { email },
    {
      withCredentials: true,
    }
  );

  return response;
}
export async function verifyOTP({
  email,
  otp,
  type,
}: {
  email: string;
  otp: string;
  type: string;
}) {
  const response = await axios.post(
    `/api/auth/local/verify-otp`,
    { email, otp, type },
    {
      withCredentials: true,
    }
  );

  return response;
}
export async function resetPassword({
  password,
  confirmPassword
}: {
  confirmPassword: string;
  password: string;
}) {
  const response = await axiosClientInstance.post(
    `/api/auth/local/reset-password`,
    { confirmPassword, password },
    {
      withCredentials: true,
    }
  );

  return response;
}
