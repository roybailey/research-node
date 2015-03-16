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
    function next() {
        // stores whether a callback has already been used
        var used;
        // uses a factory so that 'used' is local to each step
        return function factory() {
            console.log("NEXT "+steps.length);
            // after one use, next becomes a no-op
            if (used) {
                return;
            }
            used = true;
            // gets the next step and removes it from the list
            var step = steps.shift();
            // are there more steps?
            if (step) {
                // casts arguments to an array
                var args = Array.prototype.slice.call(arguments);
                // gets the error argument, remove it from the arguments
                var err = args.shift();
                // short circuits if error was provided
                if (err) {
                    done(err, null);
                    return;
                }
                // adds a completion callback to the arguments
                args.push(next());
                // invokes the step passing the needed arguments
                step.apply(null, args);
            } else {
                // call done, no need to manipulate arguments
                done.apply(null, arguments);
            }
        };
    }
    // creates the first step function
    var start = next();
    // executes the step, doesn't provide additional arguments
    start();
}

flow([getUsers,getAccounts,getEntitlements],done);
console.log("EOF");
