import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllRoles(roleNum = 6, searchKey = "") {
  authorizedHttpJson.defaults.headers["roleNum"] = roleNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(`${api_url}/roles`);
}
