import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllUsers(userNum = 6, searchKey = "") {
  authorizedHttpJson.defaults.headers["userNum"] = userNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(`${api_url}/users`);
}
