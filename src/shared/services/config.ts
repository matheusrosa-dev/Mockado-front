import axios from "axios";

//TODO: Move this to .env file
const BASE_URL = "http://localhost:3333";

export const api = axios.create({
  baseURL: BASE_URL,
});
