import axios from "axios";

const authURL: string = "http://localhost:8081/auth";
const profileURL: string = "http://localhost:8082/profile";

export async function getUserProfile(userId: string) {
  const data = await axios.get(profileURL + "/me/" + userId);

  return data;
}
