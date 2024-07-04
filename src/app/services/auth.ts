import axios from "axios";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axios.post(`/api/auth/local/signin`, {email, password}, {
      withCredentials: true
  })

  return  response;
}
export async function forgotPassword({
  email,
}: {
  email: string;
}) {
  const response = await axios.post(`/api/auth/local/forgot-password`, {email}, {
      withCredentials: true
  })

  return  response;
}
