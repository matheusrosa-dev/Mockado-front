import axios from "axios";

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

export const api = axios.create({
  baseURL: API_BACKEND_URL,
});
