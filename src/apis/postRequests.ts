import type {
  createAccountFormType,
  loginFormType,
  registerFormRequest,
} from "@/types/types";
import { axiosInstance } from "./apiConfig";

export async function registerApi(formData: registerFormRequest) {
  const data = await axiosInstance.post("/auth/register", formData);

  return data;
}

export async function loginApi(formData: loginFormType) {
  const data = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function createAccountApi(formData: createAccountFormType) {
  const data = await axiosInstance.post("/accounts/create", formData);

  return data;
}
