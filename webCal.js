//var fullCalender = require('fullCalendar');

$(document).ready(function(){
  console.log("doc ready, cal drawing");
  $('#cal').fullCalendar({
    weekends: false
  });
  console.log($("cal"));
});
