const app = require('express')();
const port = 3001;
const cors = require('cors');

app.use(cors());

const server = require('http').createServer(app);
const { Server } = require('socket.io'); // Import the Server constructor

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log("User connected " , socket.id);

    socket.on("send_message",(data) =>{
        socket.broadcast.emit("receive_message",data)
    })

    socket.on('disconnect', function () {
        console.log('User disconnected');
      });
  });




server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});