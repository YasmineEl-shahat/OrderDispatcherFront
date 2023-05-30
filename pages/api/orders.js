import { api_url } from "../../config/config";
import { authorizedHttp } from "../../config/http";

export async function getAllOrders() {
  return await authorizedHttp.get(`${api_url}/orders`);
}
