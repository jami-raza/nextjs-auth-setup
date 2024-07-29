import { generateError } from "@/lib/Responses/generateError";
import {
  generateAuthToken,
  generateRefreshToken,
} from "@/lib/jwt/generateToken";
import {
  verifyOTPValidator,
} from "@/lib/validators/auth";
import { prisma } from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isBodyValid = verifyOTPValidator.safeParse(body);
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
    const { email, otp, type } = body;
    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!findUserEmail) {
      return generateError("Account with this email not found", 400);
    }
    const findOtp = await prisma.otp.findFirst({
      where: {
        userId: findUserEmail.id,
        type: type,
        expiresAt: { gt: new Date() },
        otp,
      },
    });
    console.log(findOtp, "FIND OTP");
    if (!findOtp) {
      return generateError("Incorrent OTP", 400);
    }

    await prisma.otp.delete({where:{id: findOtp.id}})

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
          authToken: authToken,
          refreshToken: refreshToken,
        },
      },
      { status: 200 }
    );

    response.cookies.set("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log(error, "Error");
    return generateError("Internal Server Error", 500);
  }
}
