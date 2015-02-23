var http = require('http');

var content = '';

function getUsers() {
    console.log("----- NAMES -----");
    http.get('http://country.io/names.json', function (res) {
        console.log(res.statusCode);
        console.log(res.headers);
        console.log("----- end header -----");
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log(chunk);
            console.log("----- end body -----");
            content += chunk;
        }).on('end', function() {
            console.log("----- end data -----");
            getAccounts();
        });
    }).on('error', function(err) {
        done(err,null);
    });
}

function getAccounts() {
    console.log("----- ISO3 -----");
    http.get('http://country.io/iso3.json', function (res) {
        console.log(res.statusCode);
        console.log(res.headers);
        console.log("----- end header -----");
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log(chunk);
            console.log("----- end body -----");
            content += chunk;
        }).on('end', function() {
            console.log("----- end data -----");
            getEntitlements();
        });
    }).on('error', function(err) {
        done(err,null);
    });
}

function getEntitlements() {
    console.log("----- CURRENCY -----");
    http.get('http://country.io/names.json', function (res) {
        console.log(res.statusCode);
        console.log(res.headers);
        console.log("----- end header -----");
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log(chunk);
            console.log("----- end body -----");
            content += chunk;
        }).on('end', function() {
            console.log("----- end data -----");
            done(null, content);
        });
    }).on('error', function(err) {
        done(err,null);
    });
}

function done (err, res) {
    console.log("----- done "+err +" -----");
    if (err) { throw err; }
    console.log("-----");
    console.log(res);
    console.log("-----");
}

getUsers();
console.log("EOF");
