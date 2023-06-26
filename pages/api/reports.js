import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllReports(searchKey = "", sortValue) {
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  authorizedHttpJson.defaults.headers["sortValue"] = sortValue;
  return await authorizedHttpJson.get(`${api_url}/report`);
}

export async function downloadPdf() {
  return await authorizedHttpJson.get(`${api_url}/generate-pdf`);
}
