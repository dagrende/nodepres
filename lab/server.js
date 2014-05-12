var express = require('express');
var http = require('http');

var port = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.set('log level', 1); // reduce logging

app.use(express.static(__dirname + '/app'));

server.listen(port);
console.log('Listening on port ' + port + '...');