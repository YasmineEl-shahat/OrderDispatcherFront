import { api_url } from "../../config/config";
import { io } from "socket.io-client";

export const generalSocket = io(api_url, {
  withCredentials: true,
  //   extraHeaders: {
  //     "Access-Control-Allow-Origin": "http://localhost:8080",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //   },
});
