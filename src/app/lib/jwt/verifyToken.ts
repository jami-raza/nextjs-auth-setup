import * as jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
  var decoded = jwt.verify(token, process.env.JWTSECRET || "");
  console.log(decoded); // bar
  return decoded;
}
