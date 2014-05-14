var express = require('express');
var http = require('http');

var port = 3000;
var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.set('log level', 1); // reduce logging

io.sockets.on('connection', function (socket) {
	console.log('connected to',socket.id);

	socket.on('turn', function(message) {
		// {row: 0-2, col: 0-2}
		console.log('turn', message);
		socket.broadcast.emit('turn', message);
	});

	socket.on('want-to-play', function(message) {
		// {name: 'initiator name', side: 'initiator side (1 or 2)', with: 'optional counter-player name'}
		console.log('play', message);
		socket.broadcast.emit('start-game', message);
	});
});

app.use(express.static(__dirname + '/app'));

server.listen(port);
console.log('Listening on port ' + port + '...');