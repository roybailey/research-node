var http = require('http');

var content = '';

// ------------------------------------------------------------
// Callback Hell Example
// ------------------------------------------------------------

http.get('http://country.io/names.json', function (res) {
    console.log(res.statusCode);
    console.log(JSON.stringify(res.headers));
    console.log("----- end header -----");
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log(chunk);
        console.log("----- end body -----");
        content += chunk;
    }).on('end', function() {
        console.log("----- end data -----");
        http.get('http://country.io/iso3.json', function (res) {
            console.log(res.statusCode);
            console.log(JSON.stringify(res.headers));
            console.log("----- end header -----");
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log(chunk);
                console.log("----- end body -----");
                content += chunk;
            }).on('end', function() {
                console.log("----- end data -----");
                http.get('http://country.io/currency.json', function (res) {
                    console.log(res.statusCode);
                    console.log(JSON.stringify(res.headers));
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
            });
        }).on('error', function(err) {
            done(err,null);
        });
    });
}).on('error', function(err) {
    done(err,null);
});

function done (err, res) {
    console.log("----- done "+err +" -----");
    if (err) { throw err; }
    console.log("-----");
    console.log(res);
    console.log("-----");
}
