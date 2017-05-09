const parser = require('./CsvParser.js');
const fs = require('fs');
const parse = require('csv-parse');
const moment = require('moment');
const express = require('express');
const fileUpload = require('express-fileupload')
const jsonFile = require('jsonfile')

var app = express();

app.use('/static', express.static('public'));


var events = [];
app.get("/", async (req, res) => {
  const template = await wrapReadFileToString(`roster.html`)

  res.send(template.replace("{{events}}", JSON.stringify({})));
})
app.use(fileUpload());
app.post('/upload' , async (req, res) => {
  console.log(req.files.file.name);
  const fileName = req.files.file.name;
  events = await getEvents(fileName)
  res.status('200');
  events.forEach((item)=>{
    jsonFile.writeFile(`store.json`, item, {flag: 'a'}, (err)=>{
      console.log(err);
    })
  })
  const template = await wrapReadFileToString(`roster.html`)

  res.send(template.replace("{{events}}", JSON.stringify(events)));
})

app.listen(1337, () => {
  console.log("Leet port open: Accepting leets");
})
// var processData = function(err, output, callback){
//   if (err){
//     return console.log(err);
//   }
//   var months = parser.getMonths(output[0]);
//   //console.log(months);
//
//   var times = parser.getTimes(output);
//   console.log(months);
//
// }

//console.log(parser.toString());
// parser.getEvent(processData);
async function wrapReadFile(name){
  return new Promise(resolve => {
    fs.readFile(name, (err, data) => resolve(data));
  })
}

async function wrapReadFileToString(name){
  return new Promise(resolve => {
    fs.readFile(name, "utf-8" ,(err, data) => resolve(data));
  })
}

async function wrapParse(file) {
  return new Promise(resolve => {
    parse(file, (err, data) => {
      resolve(data);
    });
  });

}
async function getEvents(fileName){
  console.log("Getting Events");
var file = await wrapReadFile(fileName);
var parsed = await wrapParse(file);
var months = parser.getMonths(parsed[0]);
var times = parser.getTimes(parsed);
return buildEvents(months, times);

//console.log(events);
};
//getEvents("roster.csv");
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
  } else if(clinic.indexOf("M") !== -1){
    var event = {
      title: clinic,
      start: startDateTime,
      end: endDateTime,
      color: "purple"
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
