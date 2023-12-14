import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from localhost:3000
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // Handle your events here
});

// Other express and Remix setup...

server.listen(8080, () => {
  console.log("listening on *:8080");
});
