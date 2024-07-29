import { generateError } from "@/lib/Responses/generateError";
import { generateAuthToken, generateRefreshToken } from "@/lib/jwt/generateToken";
import { signInValidator } from "@/lib/validators/auth";
import { compareHash } from "@/lib/hash/compareHash";
import { prisma } from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isBodyValid = signInValidator.safeParse(body);
    if (!isBodyValid.success) {
      const { errors } = isBodyValid.error;

      return Response.json(
        {
          error: errors.map((err) => err.message)[0],
        },
        {
          status: 400,
        }
      );
    }
    const { email, password } = body;

    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!findUserEmail) {
      return generateError("Account with this email not found", 400);
    }

    const comparePassword = await compareHash(password, findUserEmail.password);
    if (!comparePassword) {
      return generateError("Invalid credentials", 400);
    }

    const authToken = await generateAuthToken({
      email: findUserEmail.email,
      id: findUserEmail.id,
    });
    const refreshToken = await generateRefreshToken({
      email: findUserEmail.email,
      id: findUserEmail.id,
    });

    const response = NextResponse.json(
      {
        message: "User logged In successfully",
        data: {
          user: { ...findUserEmail, ["password"]: undefined },
          authToken:authToken,
          refreshToken:refreshToken
        },
      },
      { status: 200 }
    );

    response.cookies.set("authToken",authToken, {httpOnly:true, secure:true, sameSite: "strict", expires:new Date().getTime() + 30 * 24 * 60 * 60 * 1000});
    response.cookies.set("refreshToken",refreshToken, {httpOnly:true, secure:true, sameSite: "strict", expires:new Date().getTime() + 30 * 24 * 60 * 60 * 1000});

    return response;
  } catch (error) {
    console.log(error, "Error");
    return generateError("Internal Server Error", 500);
  }
}
