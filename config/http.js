import axios from "axios";
import cookieCutter from "cookie-cutter";
const ISSERVER = typeof window === "undefined";
let savedToken;

if (!ISSERVER) {
  savedToken = cookieCutter.get("auth");
}

const token = `Bearer ` + savedToken;
export let httpJson = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export let httpForm = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
});
export let authorizedHttpJson = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: token,
  },
});
export let authorizedHttpForm = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: token,
  },
});
