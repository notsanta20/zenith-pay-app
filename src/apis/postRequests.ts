import type { loginFormType, registerFormRequest } from "@/types/types";
import axios from "axios";

const authURL: string = "http://localhost:8081/auth";

export async function registerApi(formData: registerFormRequest) {
  const data = await axios.post(authURL + "/register", formData);

  return data;
}

export async function loginApi(formData: loginFormType) {
  const data = await axios.post(authURL + "/login", formData);

  return data;
}
