import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllOrders(orderNum = 6) {
  // Call axios Get >> return data
  console.log(orderNum);
  authorizedHttpJson.defaults.headers["orderNum"] = orderNum;
  console.log(authorizedHttpJson.defaults.headers);
  return await authorizedHttpJson.get(api_url + "/orders");
}
