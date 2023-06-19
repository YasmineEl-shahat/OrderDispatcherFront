import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllCustomers(shownNum = 6, searchKey = "") {
  authorizedHttpJson.defaults.headers["shownum"] = shownNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(`${api_url}/customers`);
}

export async function viewCustomer(id) {
  return await authorizedHttpJson.get(`${api_url}/customers/${id}`);
}
