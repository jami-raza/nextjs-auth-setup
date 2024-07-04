import { axiosClientInstance } from "./axiosClientInstance";
import { axiosServerInstance } from "./axiosSerInstance";

export async function getDashboard() {
  const response = await axiosServerInstance.get(`http://localhost:3000/api/user`, {
      withCredentials: true
  })
  console.log(response, "Response from")
  return response;
// console.log(tok, "TOKE")

//   const res = await fetch(`http://localhost:3000/api/user`, {
//     method: "GET",
//     headers:{Cookie: cookies().toString()}
//   });
//   console.log(res, "RES")
//   const response = res.json();
//   return response;
}
