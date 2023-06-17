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
