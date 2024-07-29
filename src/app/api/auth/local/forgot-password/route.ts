import { generateError } from "@/lib/Responses/generateError";
import { forgetPasswordValidator } from "@/lib/validators/auth";
import { prisma } from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendmail";
import { generateOTP } from "@/lib/common/otpGenerator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isBodyValid = forgetPasswordValidator.safeParse(body);
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
    const { email } = body;
    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!findUserEmail) {
      return generateError("Account with this email not found", 400);
    }
    const findOtp = await prisma.otp.findFirst({
      where:{
        userId: findUserEmail.id,
        type: 'ForgotPassword',
        expiresAt: {gt: new Date()}
      }
    })
    console.log(findOtp, "FIND OTP")
    if(findOtp){
      return generateError("Please generate OTP after 1 minute", 400);
    }
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);

    const createOTP = await prisma.otp.create({
      data: {
        otp: otp,
        userId: findUserEmail.id,
        expiresAt: expiresAt,
      },
    });
    sendEmail({
      email: findUserEmail.email,
      message: otp,
      name: findUserEmail.name ? findUserEmail.name : "",
    });

  

    const response = NextResponse.json(
      {
        message: "User logged In successfully",
        data: null,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error, "Error");
    return generateError("Internal Server Error", 500);
  }
}
