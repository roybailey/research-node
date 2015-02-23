// Parser constructor.
var Parser = function() {
};

// Parses the specified text.
Parser.prototype.parse = function(text) {

    var results = {};

    // Break up the file into lines.
    // Break up the file into lines.
    var lines = text.split('\n');

    lines.forEach(function(line) {
      var letter = line[0];

      if(!results[letter]) {
        results[letter] = 0;
      }

      results[letter] += 1;
    });

    return results;
};

// Export the Parser constructor from this module.
module.exports = Parser;
