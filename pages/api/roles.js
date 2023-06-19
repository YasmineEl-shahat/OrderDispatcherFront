import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllRoles(roleNum = 6) {
  authorizedHttpJson.defaults.headers["roleNum"] = roleNum;
  return await authorizedHttpJson.get(`${api_url}/roles`);
}

export async function addRole(data) {
  return await authorizedHttpJson.post(`${api_url}/roles`, data);
}

export async function viewRole(id) {
  return await authorizedHttpJson.get(`${api_url}/roles/${id}`);
}

export async function updateRole(id, data) {
  return await authorizedHttpJson.put(`${api_url}/roles/${id}`, data);
}
