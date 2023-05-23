import axios from "axios";

const ISSERVER = typeof window === "undefined";
let savedToken;

if (!ISSERVER) {
  savedToken = localStorage.getItem("token");
}

const token = `Bearer ` + savedToken;
export let http = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export let authorizedHttp = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: token,
  },
});
