//var fullCalender = require('fullCalendar');

$(document).ready(function(){
  console.log("doc ready, cal drawing");
  $('#cal').fullCalendar({
    events: [ { title: 'UR', start: '2017-5-16 08:00', end: '2017-5-16T18:00' },
  { title: 'UR', start: '2017-5-17T08:00', end: '2017-5-17T18:00' },
  { title: 'UR', start: '2017-5-19T08:00', end: '2017-5-19T18:00' },
  { title: 'UR', start: '2017-5-20T08:00', end: '2017-5-20T12:00' },
  { title: 'CS/OC',
    start: '2017-5-23T08:00',
    end: '2017-5-23T18:00' },
  { title: 'CS', start: '2017-5-24T08:00', end: '2017-5-24T18:00' },
  { title: 'CS', start: '2017-5-25T10:00', end: '2017-5-25T18:00' },
  { title: 'UR/M',
    start: '2017-5-30T08:00',
    end: '2017-5-30T19:00' },
  { title: 'CS', start: '2017-6-1T08:00', end: '2017-6-1T18:00' } ]
  });
  console.log($("cal"));
});
