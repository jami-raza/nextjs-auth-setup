import type { NextApiRequest, NextApiResponse } from 'next'


 
type ResponseData = {
  message: string
}
/**
 * @swagger
 * /api/auth:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return new Response('Hello world', {
    status: 200
  })
  // res.status(200).json({ message: 'Hello from Next.js!' })
}