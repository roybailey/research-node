
var applyToInteger = function(f,n) {
    return typeof n != 'number' || n%1 !== 0? '' : n < 0? '-' +f(-n) : f(n);
};

var insertSeparators = function(separator) {
    return function(n) {
        return applyToInteger(function insertSeparatorsInto(n) {
            var threeDigits = function (n) {
                var s = n.toString();
                while(s.length < 3) {
                    s = '0' + s;
                }
                return s;
            };
            if(n < 1000) {
                return n.toString();
            } else {
                return insertSeparatorsInto(Math.floor(n/1000)) + separator + threeDigits(n%1000);
            }
        }, n);
    };
};

var insertCommas = insertSeparators(',');
var insertPoints = insertSeparators('.');

console.log(insertCommas(123456789));
console.log(insertPoints(-123456789));
