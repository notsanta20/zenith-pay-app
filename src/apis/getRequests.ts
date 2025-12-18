import { axiosInstance } from "./apiConfig";

export async function verifyUserApi() {
  const data = await axiosInstance.get("/auth/verify");

  return data;
}

export async function getUserProfile() {
  const data = await axiosInstance.get("/profile/me/");

  return data;
}

export async function getTotalBalance() {
  const data = await axiosInstance.get("/accounts/user/total-balance");

  return data;
}

export async function getAllAccounts() {
  const data = await axiosInstance.get("/accounts/all-accounts");

  return data;
}

export async function getUserBootstrap() {
  const data = await axiosInstance.get("/auth/user/bootstrap");

  return data;
}

export async function getLatestTransactions() {
  const data = await axiosInstance.get(
    "/transactions/all-transactions?limited=1",
  );

  return data;
}

export async function getAllTransactions() {
  const data = await axiosInstance.get("/transactions/all-transactions");

  return data;
}
