import { api_url } from "../../config/config";
import { authorizedHttpJson, httpJson } from "../../config/http";

export async function getAllOrders(
  orderNum = 6,
  searchKey = "",
  governate = "",
  city = "",
  status = ""
) {
  authorizedHttpJson.defaults.headers["orderNum"] = orderNum;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  authorizedHttpJson.defaults.headers["governate"] = governate;
  authorizedHttpJson.defaults.headers["city"] = city;
  authorizedHttpJson.defaults.headers["status"] = status;
  return await authorizedHttpJson.get(api_url + "/orders");
}

export async function saveOrder(orderData) {
  return await httpJson.post(api_url + "/orders/save", orderData);
}

export async function assignOrder(order_id) {
  return await httpJson.get(api_url + "/dispatch/" + order_id);
}

export async function getAllStatuses() {
  return await httpJson.get(api_url + "/orders/status");
}
