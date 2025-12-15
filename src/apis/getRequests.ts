import axios from "axios";

const URL: string = import.meta.env.VITE_BACKEND_SERVER_URL;

export async function getUserProfile(userId: string) {
  const data = await axios.get(URL + "/profile/me/" + userId);

  return data;
}

export async function getTotalBalance(userId: string) {
  const data = await axios.get(
    URL + "/accounts/user/" + userId + "/total-balance",
  );

  return data;
}

export async function getAllAccounst(userId: string) {
  const data = await axios.get(URL + "/accounts/user/" + userId);

  return data;
}
