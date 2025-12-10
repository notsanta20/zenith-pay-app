import axios from "axios";

const authURL: string = "http://localhost:8081/auth";
const profileURL: string = "http://localhost:8082/profile";
const accountURL: string = "http://localhost:8083/accounts";

export async function getUserProfile(userId: string) {
  const data = await axios.get(profileURL + "/me/" + userId);

  return data;
}

export async function getTotalBalance(userId: string) {
  const data = await axios.get(
    accountURL + "/user/" + userId + "/total-balance",
  );

  return data;
}

export async function getAllAccounst(userId: string) {
  const data = await axios.get(accountURL + "/user/" + userId);

  return data;
}
