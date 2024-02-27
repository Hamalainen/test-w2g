import { io } from "socket.io-client";
import { playerAction, playerMessage } from "../interfaces/playerMessages";
let socket: any;

if (typeof window !== "undefined") {
  fetch(window.origin + "/api/socket");
}

socket = io();

export let message: playerMessage = {
  roomId: "",
  currentTimePercentage: 0,
};

export const nextVideo = (videoId: string) => {
  message.currentVideo = videoId;
  message.currentTimePercentage = 0;
  message.action = playerAction.Play;
  socket.emit("video-change", message);
};

socket.onAny((event: any, msg: playerMessage) => {
  message = msg;
});
export default socket;
