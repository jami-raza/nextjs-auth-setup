import { signUpValidator } from "@/app/lib/validators/auth";
import { generateError } from "@/app/lib/Responses/generateError";
import { generateHash } from "@/app/lib/hash/generateHash";
import {
  generateAuthToken,
  generateRefreshToken,
} from "@/app/lib/jwt/generateToken";
import { prisma } from "@/app/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isBodyValid = signUpValidator.safeParse(body);
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
    const { email, password, fullName } = body;

    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (findUserEmail) {
      return generateError("Account with this email already exist", 400);
    }

    const hashPass = await generateHash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: fullName,
        password: hashPass,
      },
    });

    const authToken = await generateAuthToken({
      email: user.email,
      id: user.id,
    });
    const refreshToken = await generateRefreshToken({
      email: user.email,
      id: user.id,
    });

    const response = NextResponse.json(
      {
        message: "User logged In successfully",
        data: {
          user: { ...user, ["password"]: undefined },
          authToken: authToken,
          refreshToken: refreshToken,
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
