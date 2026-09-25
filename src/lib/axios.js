import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
  const token =
  typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;