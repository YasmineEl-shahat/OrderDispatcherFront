import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllReports() {
  return await authorizedHttpJson.get(`${api_url}/report`);
}
