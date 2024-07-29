import * as bcrypt from "bcrypt";

export async function compareHash(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
