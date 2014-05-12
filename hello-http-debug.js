var http = require('http');
var request_count = 0;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  request_count++;
}).listen(1337, '127.0.0.1');
