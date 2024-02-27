import { playerMessage } from "@/src/interfaces/playerMessages";
import { Server } from "socket.io";

let state: playerMessage[] = [];

const saveMessage = (msg: playerMessage) => {
  let room = state.find((a) => {return a.roomId == msg.roomId});
  if (room) {
    room.action = msg.action ?? undefined;
    room.currentTimePercentage = msg.currentTimePercentage;
    room.currentVideo = msg.currentVideo ?? undefined;
    room.roomId = msg.roomId;
  } else {
    state.push({
      action: msg.action,
      currentTimePercentage: msg.currentTimePercentage,
      currentVideo: msg.currentVideo,
      roomId: msg.roomId,
    });
  }
};

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.prependAny((event: any, msg: playerMessage) => {
        saveMessage(msg);
      });
      socket.on("joinRoom", (msg: playerMessage) => {
        console.log("joining room " + msg.roomId);
        socket.join(msg.roomId)
        socket.emit("joined-room", state.find((a) => {return a.roomId == msg.roomId}));
      });
      socket.on("playerState-change", (msg: playerMessage) => {
        io.to(msg.roomId).emit("update-playerState", state.find((a) => {return a.roomId == msg.roomId}));
      });
      socket.on("playerProgress-change", (msg: playerMessage) => {
        io.to(msg.roomId).emit("update-playerProgress", state.find((a) => {return a.roomId == msg.roomId}));
      });
      socket.on("video-change", (msg: playerMessage) => {
        io.to(msg.roomId).emit("update-video", state.find((a) => {return a.roomId == msg.roomId}));
      });
    });
  }
  res.end();
};

export default SocketHandler;
