var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');

console.log(new Date());
console.log(process.pid);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(ecstatic({ root: __dirname + '/public' }));
app.listen(8124);
console.log('Server running at http://127.0.0.1:8124/');
