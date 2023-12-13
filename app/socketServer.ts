import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  // Handle your events here
});

// Other express and Remix setup...

server.listen(3001, () => {
  console.log("listening on *:3001");
});
