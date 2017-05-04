var parser = require('./CsvParser.js');
var fs = require('fs');
var parse = require('csv-parse');
var moment = require('moment');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send(`<html>
  <head>
  <link rel='stylesheet' href='fullcalendar.css' />
  <script src='jquery.min.js'></script>
  <script src='moment.min.js'></script>
  <script src='fullcalendar.js'></script>
  <script src='webCal.js'></script>
  </head>
  <body>
  <div id='cal'></div>
  </body>


  </html>`);
})

app.listen(1337, () => {
  console.log("All of the dicks");
})
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

var buildEvents = function(months, times){
  var currentProcDate = -1;
  var events = [];
  var useSecondMonth = false;
  for (var i = 0; i < times.length; i++){
    if (currentProcDate < parseInt(times[i][0]) && !useSecondMonth){
      events.push(BuildEvent(months[0], times[i][0],times[i][1],times[i][2],times[i][3]));
    } else if (currentProcDate > parseInt(times[i][0]) || useSecondMonth){
      useSecondMonth = true;
      events.push(BuildEvent(months[1], times[i][0],times[i][1],times[i][2],times[i][3]));
    }
    currentProcDate = parseInt(times[i][0]);
  }

  return events;
}

var BuildEvent = function(month, dayNumber, startTime, endTime, clinic){
  var startDateTime = dateTimeBuilder(month, dayNumber, startTime);
  var endDateTime = dateTimeBuilder(month, dayNumber, endTime);

  if (endTime < "18:00"){
    var event = {
      title: clinic,
      start: startDateTime,
      end: endDateTime,
      color: 'green'
    }
  } else if (clinic.indexOf("OC") !== -1){
    var event = {
      title: clinic,
      start: startDateTime,
      end: endDateTime,
      color: 'red'
    }
  } else {
    var event = {
      title: clinic,
      start: startDateTime,
      end: endDateTime
    }
  }


  return event;
}

var dateTimeBuilder = function(month, dayNumber, time){

  var year = moment().year();
  var monthNum = getMonthNumberFromName(month);

  var timeFormatted = time.length == 5 ? time : ("0" + time);
  var monthFormatted = monthNum.length == 2 ? monthNum : ("0" + monthNum);
  var dayFormatted = dayNumber.length == 2 ? dayNumber : ("0" + dayNumber);

  return (year + "-" + monthFormatted + "-" + dayFormatted + "T" + timeFormatted );


}

var getMonthNumberFromName = function (monthStr){
    return new Date(monthStr+'-1-01').getMonth()+1
}
