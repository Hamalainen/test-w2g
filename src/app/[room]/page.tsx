"use client";

import SearchPage from "@/src/components/search";
import socket from "@/src/api/socketApi";
import Player from "@/src/components/player";

export default function room({ params }: { params: { room: string } }) {
  socket.emit("joinRoom", params.room);
  return (
    <main>
      <SearchPage />
      <Player room={params.room} />
      <div id="player"></div>
    </main>
  );
}
