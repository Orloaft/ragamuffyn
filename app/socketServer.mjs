


// server.js
import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as build from "../build/index.js"
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO setup
io.on('connection', (socket) => {
  console.log("a user connected");
  socket.on("testEvent", (data) => {
    console.log("Received testEvent:", data);
  });
  socket.on("updateGrid", async(data) => {
    console.log("yeeet",data)
 
     socket.broadcast.emit("gridUpdate",data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Serve static assets
app.use(express.static('./public'));

app.all(
  '*',
  createRequestHandler({
    build: build,
    // Remix specific configurations
    mode: process.env.NODE_ENV,
  })
);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
