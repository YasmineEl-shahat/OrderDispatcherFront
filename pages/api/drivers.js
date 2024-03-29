import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllDrivers(driverNum = 6, searchKey = "") {
  authorizedHttpJson.defaults.headers["driverNum"] = driverNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(`${api_url}/drivers`);
}

export async function deleteDriver(id) {
  return await authorizedHttpJson.delete(`${api_url}/drivers/${id}`);
}

export async function addDriver(data) {
  return await authorizedHttpJson.post(`${api_url}/drivers`, data);
}

export async function viewDriver(id) {
  return await authorizedHttpJson.get(`${api_url}/drivers/${id}`);
}

export async function updateDriver(id, data) {
  return await authorizedHttpJson.patch(`${api_url}/drivers/${id}`, data);
}
