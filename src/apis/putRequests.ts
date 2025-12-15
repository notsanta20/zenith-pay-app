import type { userProfileFormType } from "@/types/types";
import { axiosInstance } from "./apiConfig";

export async function updateUserProfileApi(formData: userProfileFormType) {
  const data = await axiosInstance.put("/profile/update", formData);

  return data;
}
