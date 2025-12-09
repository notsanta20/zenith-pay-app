import type { userProfileFormType } from "@/types/types";
import axios from "axios";

const authURL: string = "http://localhost:8081/auth";
const profileURL: string = "http://localhost:8082/profile";

export async function updateUserProfileApi(formData: userProfileFormType) {
  const data = await axios.put(profileURL + "/update", formData);

  return data;
}
