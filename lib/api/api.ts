import axios from "axios";

const baseURL = "https://notehub-public.goit.study/api";
const token =  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});
