import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("USER HIT")
  const user = req.headers.get('user')
  console.log(user, "USER HEADERS");
  return new Response("Hello world", {
    status: 200,
  });
  // res.status(200).json({ message: 'Hello from Next.js!' })
}