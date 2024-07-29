"use server";

import { cookies } from "next/headers";
import { prisma } from "@/db/prismaClient";
import { signIn, signOut } from "@/auth";
import {
  generateAuthToken,
  generateRefreshToken,
} from "@/lib/jwt/generateToken";

export async function getAuthToken() {
  const authToken = cookies().get("authToken");
  const refreshToken = cookies().get("refreshToken");
  return {
    authToken,
    refreshToken,
  };
  //   // or
  //   cookies().set('name', 'lee', { secure: true })
  //   // or
  //   cookies().set({
  //     name: 'name',
  //     value: 'lee',
  //     httpOnly: true,
  //     path: '/',
  //   })
}
export async function getHeadersAuthToken() {
  return cookies().toString();
  //   // or
  //   cookies().set('name', 'lee', { secure: true })
  //   // or
  //   cookies().set({
  //     name: 'name',
  //     value: 'lee',
  //     httpOnly: true,
  //     path: '/',
  //   })
}
export async function userLogout() {
  cookies().delete("authToken");
  cookies().delete("refreshToken");
}

export async function googleLogin() {
  await signIn("google");
}

export async function userGoogleLogin({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string;
}) {
  const findUserEmail = await prisma.user.findUnique({
    where: { email: email },
  });
  console.log(findUserEmail, "Find User Email ====> ");
  let user;
  if (findUserEmail) {
    console.log(findUserEmail, "Find User Email");
    user = findUserEmail;
  } else {
    user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: "",
        provider:'GOOGLE'
      },
    });
  }
  const authToken = await generateAuthToken({
    email: user.email,
    id: user.id,
  });
  const refreshToken = await generateRefreshToken({
    email: user.email,
    id: user.id,
  });

  console.log(authToken, "AUTH TOKEN ============>");
  console.log(refreshToken, "REFRESH TOKEN ============>");

  cookies().set("authToken", authToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
  });
  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
  });
}
