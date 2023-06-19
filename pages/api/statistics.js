import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getTotalOrders() {
  return await authorizedHttpJson.get(api_url + "/total/orders");
}

export async function getNewOrders() {
  return await authorizedHttpJson.get(api_url + "/total/neworders");
}

export async function getDeliveredOrders() {
  return await authorizedHttpJson.get(api_url + "/total/deliveredorders");
}

export async function getCancelledOrders() {
  return await authorizedHttpJson.get(api_url + "/total/cancelledorders");
}

export async function getPickedOrders() {
  return await authorizedHttpJson.get(api_url + "/total/pickedorders");
}

export async function getAssignOrders() {
  return await authorizedHttpJson.get(api_url + "/total/assignorders");
}

export async function getReassignOrders() {
  return await authorizedHttpJson.get(api_url + "/total/reassignorders");
}
