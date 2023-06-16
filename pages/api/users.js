import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllUsers(
  userNum = 6,
  searchKey = "",
  role = "",
  active
) {
  authorizedHttpJson.defaults.headers["userNum"] = userNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  authorizedHttpJson.defaults.headers["role"] = role;
  authorizedHttpJson.defaults.headers["active"] = active;
  return await authorizedHttpJson.get(`${api_url}/users`);
}

export async function addUser(data) {
  return await authorizedHttpJson.post(`${api_url}/users`, data);
}
