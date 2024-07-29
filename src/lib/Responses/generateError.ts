export function generateError(errorMessage: string, statusCode: number) {
  return Response.json({ error: errorMessage }, { status: statusCode });
}
