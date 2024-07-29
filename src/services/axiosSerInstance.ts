import axios from "axios";
import { cookies } from "next/headers";

// Create an Axios instance
const axiosServerInstance = axios.create({
  withCredentials: true, // Ensure credentials are sent with every request
});

// Add a request interceptor to include the cookie in the headers
axiosServerInstance.interceptors.request.use(
  (config) => {
    // Assuming you have access to the cookie value
    //  const authToken = 'your-auth-token';

    //  // Set the cookie in the header
    config.headers["Cookie"] = [
      `authToken=${cookies().get("authToken")?.value.toString()}`,
      `refreshToken=${cookies().get("refreshToken")?.value.toString()}`,
    ];
    //  config.headers['Cookie'] = `refreshToken=${cookies().get('refreshToken')?.value.toString()}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axiosServerInstance };
