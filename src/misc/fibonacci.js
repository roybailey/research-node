function fibonacci(i, n, f1, f2, callback) {
    if (i >= n)
        callback(n + ": " + (f1 + f2));
    else
        setImmediate(function() {
            fibonacci(i + 1, n, f2, f1 + f2, callback);
        });
}

var from = 0, upto = 5;
console.log("Fibonacci from "+from+" upto "+upto);
fibonacci(from, upto, 1, 1, function(data) {
    console.log(data);
});
