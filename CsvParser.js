module.exports = {
  getEvent: function(callback){
    handler.CsvHandler(callback);

  },
  getMonths: function(inputArray){
      var monthsStr = inputArray[0];
      var monthsArray = monthsStr.split(' ');
      return monthsArray;
  },
  getTimes: function(inputArray){
    var returnTimes = [];
    for (var i = 0; i < 4; i++){
      var j;
      switch (i) {
        case 0:
          j = WEEK_1_START_LINE;
          break;
        case 1:
          j = WEEK_2_START_LINE;
          break;
        case 2:
          j = WEEK_3_START_LINE;
          break;
        case 3:
          j = WEEK_4_START_LINE;
          break;
      }
      var k = j + 7;
      for (j; j<= k; j++){
        var clinic = inputArray[j][MADDIE_TIMES_INDEX + 2].trim();
        //console.log(clinic == "RDO"); //+ ": " + clinic.toString() !== "RDO"
        if(clinic != "RDO" && clinic != ''){
          var tempTime = [inputArray[j][1],inputArray[j][MADDIE_TIMES_INDEX], inputArray[j][MADDIE_TIMES_INDEX + 1], clinic]
          console.log(tempTime);
          returnTimes.push(tempTime);
        }
        //else //console.log("Day off!!");
      }
    }
    return returnTimes;
  }

}

var handler = require('./CsvHandler.js');

var WEEK_1_START_LINE = 2;
var WEEK_2_START_LINE = 12;
var WEEK_3_START_LINE = 22;
var WEEK_4_START_LINE = 32;

var MADDIE_TIMES_INDEX = 22;

var doStuff = function(err, output, callback){
  if (err){
    return console.log(err);
  }
  var months = getMonths(output[0]);
  //console.log(months);

  var times = getTimes(output);
//  console.log(times);
  callback( months, times);
}

//console.log(csvToParse);

//


// for (var i =0; i < csvToParse.length){
//
// }
