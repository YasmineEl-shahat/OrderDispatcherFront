import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllUsers() {
  return await authorizedHttpJson.get(`${api_url}/users`);
}
