import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getAllLocations(
  location = "governates",
  shownNumber = 6,
  searchKey = ""
) {
  authorizedHttpJson.defaults.headers["shownumber"] = shownNumber;
  authorizedHttpJson.defaults.headers["searchKey"] = searchKey;
  return await authorizedHttpJson.get(`${api_url}/locations/${location}`);
}

export async function getAllGovernates() {
  return await authorizedHttpJson.get(`${api_url}/locations/governates`);
}

export async function getAllCities() {
  return await authorizedHttpJson.get(`${api_url}/locations/cities`);
}

export async function getAllAreas() {
  return await authorizedHttpJson.get(`${api_url}/locations/areas`);
}

export async function deleteLocation(location = "governates", id) {
  return await authorizedHttpJson.delete(
    `${api_url}/locations/${location}/${id}`
  );
}
