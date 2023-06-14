import { api_url } from "../../config/config";
import { authorizedHttpJson, httpJson } from "../../config/http";

export async function getAllOrders(orderNum = 6, searchKey = "") {
  // Call axios Get >> return data
  authorizedHttpJson.defaults.headers["orderNum"] = orderNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(api_url + "/orders");
}

export async function saveOrder(orderData) {
  return await httpJson.post(api_url + "/orders/save", orderData);
}

export async function assignOrder(order_id) {
  return await httpJson.get(api_url + "/dispatch/" + order_id);
}
