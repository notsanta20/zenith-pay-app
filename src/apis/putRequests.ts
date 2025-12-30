import type { passwordFormRequest, userProfileFormType } from "@/types/types";
import { axiosInstance } from "./apiConfig";

export async function updateUserProfileApi(formData: userProfileFormType) {
  const data = await axiosInstance.put("/profile/update", formData);

  return data;
}

export async function updatePassApi(formData: passwordFormRequest) {
  const data = await axiosInstance.put("/auth/update-password", formData);

  return data;
}

export async function updateSecurityNotification() {
  const data = await axiosInstance.put("/profile/update-security-notification");

  return data;
}

export async function updateGeneralNotification() {
  const data = await axiosInstance.put("/profile/update-general-notification");

  return data;
}

export async function readNotifications() {
  const data = await axiosInstance.put("/notifications/read");

  return data;
}
