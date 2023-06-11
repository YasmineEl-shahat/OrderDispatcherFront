import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function userLogin(data) {
  return await httpJson.post(`${api_url}/login`, data);
}
