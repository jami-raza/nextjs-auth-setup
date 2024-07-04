import Image from "next/image";
import { GoogleSignIn, SignIn, SignOut } from "./components/signIn";
import { auth } from '@/auth'
import Link from "next/link";

export default async function Home() {
  const data = await auth()
  console.log(data?.user, "USER DATA")
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SignIn />
      <GoogleSignIn />
      <SignOut /> */}
      {/* {data?.user?.name} */}
      Home
      <div className="flex justify-center align-middle gap-3">
        <Link className="text-primary" href={'/signin'}>Sign In</Link>
        <Link className="text-primary" href={'/signup'}>Sign Up</Link>
        <Link className="text-primary" href={'/dashboard'}>Sign Dashboard</Link>
        <GoogleSignIn/>
        <SignOut/>
      </div>
    </main>
  );
}
