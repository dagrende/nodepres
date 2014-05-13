var express = require('express');
var http = require('http');

var port = 8080;

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.set('log level', 1); // reduce logging


io.sockets.on('connection', function (socket) {
	console.log('connected to ',socket.id);
	socket.on('turn', function(message) {
		console.log('turn', message);
		socket.broadcast.emit('turn', message);
	});
	socket.on('play', function(message) {
		console.log('play', message);
		socket.broadcast.emit('play', message);
	});
});

app.use(express.static(__dirname + '/app'));

server.listen(port);
console.log('Listening on port ' + port + '...');