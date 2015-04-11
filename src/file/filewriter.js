var path = require('path');
var fs = require('fs');

console.log("pid=" + process.pid);
console.log(new Date());

var jsonFilename = path.join(__dirname, '../../data', 'filewriter.json');
console.log(jsonFilename);

var tasks = [
    "Shopping",
    "Washing",
    "Car Service",
    "Revision Study",
    "Appointment",
    "Trip to tip",
    "Tidy garage",
    "Fix broken chair",
    "Order present"
];
var guid = 0;
var dueDate = new Date();
dueDate.setDate(dueDate.getDate()+5);

var wstream = fs.createWriteStream(jsonFilename);
tasks.forEach(function (it) {
    var record = {
        guid: ++guid,
        name: it,
        description: it+" needs to be done",
        dueDate: dueDate,
        effort: 100,
        progress: 0
    };
    wstream.write("\""+record.guid+"\":"+JSON.stringify(record) + ',\n');
});
wstream.end();

