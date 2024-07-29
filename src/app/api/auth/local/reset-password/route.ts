import { generateError } from "@/lib/Responses/generateError";
import { generateHash } from "@/lib/hash/generateHash";
import {
  generateAuthToken,
  generateRefreshToken,
} from "@/lib/jwt/generateToken";
import {
  resetPasswordValidator,
} from "@/lib/validators/auth";
import { prisma } from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

type IReqUser = {
  id: string;
  email: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isBodyValid = resetPasswordValidator.safeParse(body);
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
    const { password } = body;
    let reqUser = request.headers.get("user");

    if (reqUser === null || undefined) {
      return generateError("User not found", 400);
    }
    const user: IReqUser = JSON.parse(reqUser);

    const findUserEmail = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!findUserEmail) {
      return generateError("Account with this email not found", 400);
    }

    const hashPass = await generateHash(password);

    const updateUserPassword = await prisma.user.update({
      data: { password: hashPass },
      where: {
        id: findUserEmail.id,
      },
    });

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
        message: "User Password Updated successfully",
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
