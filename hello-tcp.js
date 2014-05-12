var net = require('net');

var server = net.createServer(function (socket) {
  socket.write('Hello, World\r\n');
});

server.listen(1337);