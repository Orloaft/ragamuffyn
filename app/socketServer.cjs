const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("express"); // Update with the actual path
const axios = require("axios")


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
  socket.on("updateGrid", async(data) => {
    console.log("yeeet")
     axios.post(`http://localhost:3000/api/updateData`,{id:data.id,updates:data.state}).then((res)=>{
   
      socket.broadcast.emit("gridUpdate", res.data.data);
     }).catch((err)=>console.log(err))
  
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Socket.io server listening on port 8080");
});
