const socketIO = require('socket.io');

function createConnection(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log(socket.id);
  });
}

module.exports = createConnection;
