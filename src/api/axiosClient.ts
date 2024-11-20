import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Pastikan API URL ada di .env.local
  headers: {
    "Content-Type": "application/json",
    apiKey: process.env.MY_SECRET_API_KEY,
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Tambah token jika ada, misalnya untuk authentication
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handling error seperti 401 Unauthorized atau 500 Server Error
    if (error.response && error.response.status === 401) {
      // Misalnya, redirect ke halaman login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
