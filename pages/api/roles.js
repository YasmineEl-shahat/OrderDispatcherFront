import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllRoles(roleNum = 6) {
  authorizedHttpJson.defaults.headers["roleNum"] = roleNum;
  return await authorizedHttpJson.get(`${api_url}/roles`);
}
