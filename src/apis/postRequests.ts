import type { loginFormType, registerFormRequest } from "@/types/types";
import axios from "axios";

const URL: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export async function registerApi(formData: registerFormRequest) {
  const data = await axios.post(URL + "/auth/register", formData);

  return data;
}

export async function loginApi(formData: loginFormType) {
  const data = await axios.post(URL + "/auth/login", formData);

  return data;
}
