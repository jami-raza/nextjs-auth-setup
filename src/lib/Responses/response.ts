export function getResponse(
  response: { [key: string]: string | [] | Object | number | boolean },
  statusCode: number
) {
  return Response.json(response, { status: statusCode });
}
