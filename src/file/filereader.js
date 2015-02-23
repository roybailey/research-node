var path = require('path');
var fs = require('fs');

console.log(new Date());

var txtFilename = path.join(__dirname,'../../data','iso-country-codes.txt');
console.log(txtFilename);
fs.readFile(txtFilename, {encoding : 'utf-8'}, function(err,data) {
	if (err) {
		throw err;
	}
	console.log(data);
});
console.log("pid="+process.pid);
