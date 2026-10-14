import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 8000,
});

export const getHome = (signal) => api.get("/home/", { signal }).then((res) => res.data);
export const getAbout = (signal) => api.get("/about/", { signal }).then((res) => res.data);
