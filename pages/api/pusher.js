import Pusher from "pusher-js";

Pusher.logToConsole = true;
const pusher = new Pusher("bec24d45349a2eb1b439", {
  cluster: "eu",
});

export const channel = pusher.subscribe("orders");
