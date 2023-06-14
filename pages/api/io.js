import { api_url } from "../../config/config";
import io from "socket.io-client";

export const generalSocket = io(api_url);
