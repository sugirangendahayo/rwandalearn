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

export default axiosInstance;
