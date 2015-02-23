var util = require('util');
var http = require('http');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

console.log(new Date());
console.log(process.pid);

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

var pages = [
    {route: '', output: 'Woohoo!'},
    {route: 'about', output: 'A simple routing with Node example'},
    {route: '/about/this', output: 'Multilevel routing with Node'},
    {route: '/about/node', output: 'Evented I/O for V8 JavaScript.'},
    {route: 'another page', output: function () {
        return 'Here\'s ' + this.route;
    }}
];

var cache = {};
function cacheAndDeliver(f, cb) {
    fs.stat(f, function (err, stats) {
        if (err) {
            return console.log('Oh no!, Error', err);
        }
        var lastChanged = Date.parse(stats.ctime);
        var isUpdated = (cache[f]) && lastChanged > cache[f].timestamp;
        if (!cache[f] || isUpdated) {
            fs.readFile(f, function (err, data) {
                console.log('loading ' + f + ' from file');
                if (!err) {
                    cache[f] = {content: data, timestamp: Date.now()};
                }
                cb(err, cache[f].content);
            }); // end of fs.stat
            return;
        }
        console.log('loading ' + f + ' from cache');
        cb(err, cache[f].content);
    });
}

function processGet(req, res, lookup) {
    // search page mappings for match
    pages.forEach(function (page) {
        if (page.route === lookup) {
            console.log("Found page " + page.route);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(typeof page.output === 'function' ? page.output() : page.output);
        }
    });
    // check static file under public folder
    var f = 'public/' + lookup;
    console.log("checking: " + f);
    fs.exists(f, function (exists) {
        console.log("static: " + (exists ? lookup + " is there" : lookup + " doesn't exist"));
        if (exists) {
            // load file and return contents with correct mime-type
            cacheAndDeliver(f, function (err, data) {
                if (err) {
                    console.log("error reading file: " + err);
                    res.writeHead(500);
                    res.end('Server Error!');
                    return;
                }
                console.log("reading: " + f);
                var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
                res.writeHead(200, headers);
                res.end(data);
            });
        } else {
            res.writeHead(404); //no such file found!
            res.end('Page not found!');
            console.log("not found");
        }
    });
}

function processPost(req, res, lookup) {
    var postData = '';
    var maxData = 2 * 1024 * 1024; // 2mb
    req.on('data', function (chunk) {
        postData += chunk;
        if (postData.length > maxData) {
            postData = '';
            this.destroy();
            response.writeHead(413); // Request Entity Too Large
            response.end('Too large');
        }
    }).on('end', function () {
        // prevents empty post
        if (!postData) {
            response.end();
            return;
        }
        var postDataObject = querystring.parse(postData);
        console.log('User Posted:\n', postData);
        res.end('You Posted:\n' + util.inspect(postDataObject));
    });
}

// start server
http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
        return;
    }
    console.log("----------");
    // decode url after server
    var lookup = path.basename(decodeURI(req.url)) || 'index.html';
    console.log(req.method + " " + lookup);

    if (req.method === "GET") {
        processGet(req, res, lookup);
    }
    if (req.method === "POST") {
        processPost(req, res, lookup);
    }
}).listen(8124, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8124/');
