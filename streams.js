var zlib = require('zlib');
var fs = require('fs');

var inp = fs.createReadStream('file.txt');
var gzip = zlib.createGzip();
var out = fs.createWriteStream('file.txt.gz');

inp.pipe(gzip).pipe(out);
