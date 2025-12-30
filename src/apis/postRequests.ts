import type {
  createAccountFormType,
  loginFormType,
  passwordFormRequest,
  registerFormRequest,
  transactionForm,
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

export async function doTransaction(formData: transactionForm) {
  const data = await axiosInstance.post("/transactions/transact", formData);

  return data;
}

export async function logoutApi() {
  const data = await axiosInstance.post("/auth/logout");

  return data;
}

export async function checkPassApi(formData: passwordFormRequest) {
  const data = await axiosInstance.post("/auth/check-password", formData);

  return data;
}
