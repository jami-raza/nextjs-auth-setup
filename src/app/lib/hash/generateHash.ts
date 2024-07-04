import * as bcrypt from "bcrypt";

export async function generateHash(password: string) {
    return await bcrypt.hash(password, 10);
}
