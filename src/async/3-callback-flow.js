var http = require('http');

var content = '';

function getUsers(next) {
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
            next();
        });
    }).on('error', function(err) {
        done(err,null);
    });
}

function getAccounts(next) {
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
            next();
        });
    }).on('error', function(err) {
        done(err,null);
    });
}

function getEntitlements(next) {
    console.log("----- CURRENCY -----");
    http.get('http://country.io/currency.json', function (res) {
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
            next();
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

function flow(steps,done) {
    function factory() {
        var used;
        return function next() {
            console.log("NEXT "+steps.length);
            if (used) {
                return;
            }
            used = true;
            var step = steps.shift();
            if (step) {
                var args = Array.prototype.slice.call(arguments);
                var err = args.shift();
                if (err) {
                    done(err, null);
                    return;
                }
                args.push(factory());
                step.apply(null, args);
            } else {
                done.apply(null, arguments);
            }
        };
    }
    var start = factory();
    start();
}

flow([getUsers,getAccounts,getEntitlements],done);
console.log("EOF");
