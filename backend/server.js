const app = require("express")();
const port = 3001;
const cors = require("cors");

app.use(cors());

const server = require("http").createServer(app);
const { Server } = require("socket.io"); // Import the Server constructor

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//local canvas state
let canvasState = {};
//maintain all the connections
let connections = [];

// When a client connects, we note it in the console
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    user = connections.find((conn) => conn.socket.id === socket.id);
    if (user) {
      console.log(`${user.name} disconnected with socketId: ${user.socket.id}`);
      connections = connections.filter((conn) => conn.socket.id !== socket.id);
    }
  });

  socket.on("register", (name) => {
    connections.push({ socket: socket, name: name });
    console.log(`${name} connected with socketId: ${socket.id}`);
    socket.emit("get-canvas-data", JSON.stringify(canvasState));
  });

  socket.on("canvas-data", (data) => {
    //update canvas state
    const incomingData = JSON.parse(data);
    connections.forEach((conn) => {
      if (conn.socket.id !== socket.id) {
        conn.socket.emit("get-canvas-data", data);
      }
    });
    canvasState = { ...canvasState, ...incomingData };
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
