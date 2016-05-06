var PEG = require("pegjs");
var fs = require("fs");
var path = require("path");
var builtParser = require("./build/parser");

var parser = null;

// TODO: Make all this async.
module.exports = {
  buildParser: function(rebuild) {
    if (parser == null) { 
      if (rebuild == true) {
        var parserfile = fs.readFileSync(path.resolve("./solidity.pegjs"), {encoding: "utf8"});
        return PEG.buildParser(parserfile);
      }
      return builtParser;
    } 
    return parser;
  },
  parse: function(source, rebuild) {
    var parser = this.buildParser(rebuild);
    return parser.parse(source);
  },
  parseFile: function(file, rebuild) {
    return this.parse(fs.readFileSync(path.resolve(file), {encoding: "utf8"}), rebuild);
  }
};
