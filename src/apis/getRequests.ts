import { axiosInstance } from "./apiConfig";

export async function getUserProfile(userId: string) {
  const data = await axiosInstance.get("/profile/me/" + userId);

  return data;
}

export async function getTotalBalance(userId: string) {
  const data = await axiosInstance.get(
    "/accounts/user/" + userId + "/total-balance",
  );

  return data;
}

export async function getAllAccounst(userId: string) {
  const data = await axiosInstance.get("/accounts/user/" + userId);

  return data;
}
