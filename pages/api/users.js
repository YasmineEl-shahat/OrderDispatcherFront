import { api_url } from "../../config/config";
import {
  httpJson,
  authorizedHttpJson,
  authorizedHttpForm,
} from "../../config/http";

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

export async function viewUser(id) {
  return await authorizedHttpJson.get(`${api_url}/users/${id}`);
}

export async function updateUser(id, data) {
  return await authorizedHttpForm.patch(`${api_url}/users/${id}`, data);
}

export async function deleteUser(id) {
  return await authorizedHttpJson.delete(`${api_url}/users/${id}`);
}

export async function banUser(id) {
  return await authorizedHttpJson.patch(`${api_url}/users/ban/${id}`);
}

export async function getNavData(id) {
  return await httpJson.get(`${api_url}/nav/users/${id}`);
}
