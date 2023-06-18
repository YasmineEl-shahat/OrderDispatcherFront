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

export async function addLocation(data) {
  return await authorizedHttpJson.post(`${api_url}/locations`, data);
}

export async function viewArea(id) {
  return await authorizedHttpJson.get(`${api_url}/locations/areas/${id}`);
}

export async function updateArea(id, data) {
  return await authorizedHttpJson.patch(
    `${api_url}/locations/areas/${id}`,
    data
  );
}

export async function viewCity(id) {
  return await authorizedHttpJson.get(`${api_url}/locations/cities/${id}`);
}

export async function updateCity(id, data) {
  return await authorizedHttpJson.patch(
    `${api_url}/locations/cities/${id}`,
    data
  );
}

export async function viewGovernate(id) {
  return await authorizedHttpJson.get(`${api_url}/locations/governates/${id}`);
}

export async function updateGovernate(id, data) {
  return await authorizedHttpJson.patch(
    `${api_url}/locations/governates/${id}`,
    data
  );
}
