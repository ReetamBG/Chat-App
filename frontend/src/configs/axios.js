import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" ?  "/api" : "http://localhost:8000/api",
  withCredentials: true, // send cookies with requests
});

export default axiosInstance
