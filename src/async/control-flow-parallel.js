// Async task (same in all examples in this chapter)
function async(arg, callback) {
    console.log('do something with \''+arg+'\', return 1 sec later');
    setTimeout(function() { callback(arg * 2); }, 1000);
}
// Final task (same in all the examples)
function final() { console.log('Done', results); }

// A simple async series:
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

items.forEach(function(item) {
    async(item, function(result){
        results.push(result);
        if(results.length == items.length) {
            final();
        }
    })
});
