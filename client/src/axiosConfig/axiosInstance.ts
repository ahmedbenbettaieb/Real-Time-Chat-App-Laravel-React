import axios from "axios";

const token=localStorage.getItem("token");
 const axiosInstance = axios.create({
   baseURL: "http://127.0.0.1:8000/api/",
   timeout: 15000,
   withCredentials: true,
   headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
 });

export default axiosInstance ;