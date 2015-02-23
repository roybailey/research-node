var profiles = require('./profiles'); // note .js suffix is optional

console.log("load and replace...");
profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');
console.log(profiles);

console.log("parse and set...");
profiles = JSON.parse(profiles);
profiles.felix.fullname = "Felix Geisendörfer";
console.log(profiles.felix);

