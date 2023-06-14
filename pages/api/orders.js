import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllOrders(orderNum = 6, searchKey = "") {
  // Call axios Get >> return data
  console.log(searchKey);
  authorizedHttpJson.defaults.headers["orderNum"] = orderNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(api_url + "/orders");
}
