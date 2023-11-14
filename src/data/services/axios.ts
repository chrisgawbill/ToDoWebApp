import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://localhost:7184/api",
    timeout:1000
})