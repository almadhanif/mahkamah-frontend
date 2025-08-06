import axios, { AxiosError } from "axios";

// Base URL dari environment variable atau default ke localhost
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Untuk mengirim cookies dalam request
});

// Interceptor untuk request
axiosClient.interceptors.request.use(
  (config) => {
    // Mendapatkan token dari cookies jika ada (client-side only)
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor untuk response
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      if (typeof window !== "undefined") {
        // window.location.href = "/login";
        console.log("Unauthorized request - redirect to login");
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
