var parser = require('./CsvParser.js');
var fs = require('fs');
var parse = require('csv-parse');
var moment = require('moment');

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
var months = parser.getMonths(parsed[0]);
var times = parser.getTimes(parsed);
var events = buildEvents(months, times);

console.log(events);
})().then(()=>{});

const buildEvents = function(months, times){
  var currentProcDate = -1;
  const events = [];
  const useSecondMonth = false;
  for (var i = 0; i < times.length; i++){
    if (currentProcDate < parseInt(times[i][0]) && !useSecondMonth){

      events.push(BuildEvent(months[0], times[i][0],times[i][1],times[i][2],times[i][3]));
    } else if (currentProcDate > parseInt(times[i][0])){
      useSecondMonth = true;
      events.push(BuildEvent(months[1], times[i][0],times[i][1],times[i][2],times[i][3]));
    }
    currentProcDate = parseInt(times[i][0]);
  }

  return events;
}

const BuildEvent = function(month, dayNumber, startTime, endTime, clinic){
  var startDateTime = dateTimeBuilder(month, dayNumber, startTime);
  var endDateTime = dateTimeBuilder(month, dayNumber, endTime);


  var event = {
    title: clinic,
    start: startDateTime,
    end: endDateTime
  }

  return event;
}

const dateTimeBuilder = function(month, dayNumber, time){

  var year = moment().year();
  var monthNum = getMonthNumberFromName(month);

  return (year + "-" + monthNum + "-" + dayNumber + "T" + time );


}

var getMonthNumberFromName = function (monthStr){
    return new Date(monthStr+'-1-01').getMonth()+1
}
