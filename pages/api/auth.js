import { api_url } from "../../config/config";
import { http } from "../../config/http";

export async function userLogin(data) {
  return await http.post(`${api_url}/auth/login`, data);
}
