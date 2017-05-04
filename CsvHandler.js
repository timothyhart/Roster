module.exports.CsvHandler = function (callback){
    fs.readFile('roster.csv', function (err, data){
      if (err){
        return console.log(err);
      }
      parse(data, callback);
    });
}

var parse = require('csv-parse');
var fs = require('fs');
