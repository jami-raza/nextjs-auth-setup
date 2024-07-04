import * as jwt from "jsonwebtoken";
import * as jose from "jose";

console.log(process.env.JWTSECRET, "JWT SECRET");
const secret = new TextEncoder().encode(
  process.env.JWTSECRET || "",
)
export async function generateAuthToken(payload: jose.JWTPayload) {
  const alg = 'HS256'
  
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime('1m')
    .sign(secret)
  

  return token;
}
export async function generateRefreshToken(payload: jose.JWTPayload) {
  const alg = 'HS256'
  
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime('30d')
    .sign(secret)
  

  return token;
}
