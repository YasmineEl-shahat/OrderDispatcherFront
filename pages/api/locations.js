import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllLocations(location = "governate") {
  return await authorizedHttpJson.get(`${api_url}/locations/${location}`);
}

export async function getAllGovernates() {
  return await authorizedHttpJson.get(`${api_url}/locations/governate`);
}

export async function getAllCities() {
  return await authorizedHttpJson.get(`${api_url}/locations/cities`);
}
