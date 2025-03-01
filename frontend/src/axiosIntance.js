// axiosInstance.js
import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:8082/api"
  : "http://192.168.83.154:8082/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,

  
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
