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

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("register", (name) => {
    console.log("User registered ", name);
    socket.broadcast.emit("welome", name);
  });

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });

  socket.on("canvas-data", (data) => {
    console.log("data being passed in");
    let incomingData = JSON.parse(data);
    canvasState = { ...canvasState, ...incomingData };
    console.log(incomingData.objects.length);

    io.emit("canvas-data", JSON.stringify(canvasState));
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
