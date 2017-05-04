var parser = require('./CsvParser.js');
var fs = require('fs');
var parse = require('csv-parse');

var processData = function(err, output, callback){
  if (err){
    return console.log(err);
  }
  var months = parser.getMonths(output[0]);
  //console.log(months);

  var times = parser.getTimes(output);
  console.log(months);

}

//console.log(parser.toString());
// parser.getEvent(processData);
async function wrapReadFile(name){
  return new Promise(resolve => {
    fs.readFile(name, (err, data) => resolve(data));
  })
}

async function wrapParse(file) {
  return new Promise(resolve => {
    parse(file, (err, data) => {
      resolve(data);
    });
  });

}
(async function x(){
var file = await wrapReadFile("roster.csv");
var parsed = await wrapParse(file);
console.log(parsed);
})().then(()=>{});
// async function wrapReadFile(name){
//   return new Promise(resolve => {
//     fs.ReadFile(name, (err, data) => resolve(data));
//   })
// }
//
// async function wrapParse(file) {
//   return new Promise(resolve => {
//     parse(file, (err, data) => {
//       resolve(data);
//     });
//   });
// }
