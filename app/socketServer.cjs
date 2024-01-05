const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("express"); // Update with the actual path

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("testEvent", (data) => {
    console.log("Received testEvent:", data);
  });
  socket.on("updateGrid", (data) => {
    console.log("updating",data);
    socket.broadcast.emit("gridUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Socket.io server listening on port 8080");
});
