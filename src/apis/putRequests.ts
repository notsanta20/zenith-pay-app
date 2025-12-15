import type { userProfileFormType } from "@/types/types";
import axios from "axios";

const URL: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export async function updateUserProfileApi(formData: userProfileFormType) {
  const data = await axios.put(URL + "/profile/update", formData);

  return data;
}
