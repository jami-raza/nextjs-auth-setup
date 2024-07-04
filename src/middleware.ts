import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "./app/lib/jwt/verifyToken";
import * as jose from "jose";
import { generateError } from "./app/lib/Responses/generateError";
import {
  generateAuthToken,
  generateRefreshToken,
} from "./app/lib/jwt/generateToken";



// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/api/user/:path*", "/api/auth/local/reset-password"],
};
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWTSECRET),
};

export async function middleware(request: NextRequest) {
  console.log(request.cookies.getAll(), "REQUEST COOKIES");
  const authTokenCookie = request.cookies.get("authToken")?.value;
  const refreshTokenCookie = request.cookies.get("refreshToken")?.value;
  const requestHeaders = new Headers(request.headers);
  try {
    // Getting cookies from the request using the `RequestCookies` API
    console.log(authTokenCookie, refreshTokenCookie, "GET ALL COOKIES");

    // Remove Bearer from string
    let token = authTokenCookie && authTokenCookie.replace(/^Bearer\s+/, "");

    if (token) {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret);
      console.log(decoded, "Decoded");
      requestHeaders.set(
        "user",
        JSON.stringify({ id: decoded.payload.id, email: decoded.payload.email })
      );
    } else {
      return generateError("No auth token in header cookie", 401);
    }
    const response = NextResponse.next({ request, headers: requestHeaders });
    return response;
  } catch (error: any) {
    console.log(error, "Error");
    if (error && (error["code"] as string) === "ERR_JWT_EXPIRED") {
      console.log(error["code"], "Error code");
      try {
        let refreshToken =
          refreshTokenCookie && refreshTokenCookie.replace(/^Bearer\s+/, "");

        if (refreshToken) {
          const decoded = await jose.jwtVerify(refreshToken, jwtConfig.secret);
          console.log(decoded, "Decoded Refresh");
          const payload = {
            id: decoded.payload.id,
            email: decoded.payload.email,
          };

          

          const updatedAuthToken = await generateAuthToken(payload);
          const updatedRefreshToken = await generateRefreshToken(payload);
          requestHeaders.set(
            "user",
            JSON.stringify({
              id: decoded.payload.id,
              email: decoded.payload.email,
            })
          );
          const response = NextResponse.next({
            request,
            headers: requestHeaders,
          });

          response.cookies.set("authToken", updatedAuthToken, {
            httpOnly: true,
            secure: true,
            expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
          });
          response.cookies.set("refreshToken", updatedRefreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
          });

          return response;
        } else {
          return generateError("No refresh token in header cookie", 401);
        }
      } catch (error) {
        console.log(error, "Error generating refresh token");
      }
    }
    return generateError("Invalid JWT token", 401);
  }
}
