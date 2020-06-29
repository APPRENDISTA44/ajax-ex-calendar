$(document).ready(function() {
  var data = {
    "day" : 1,
    "month" : 1,
    "year" : 2018,
  };
  
  //Handlebars
  var source = $('#mese-template').html();
  var template = Handlebars.compile(source);
  var html = template();
  $('.container').append(html);
  $('.calendario h2').text(moment(data.day + "-" + data.year, "MM-YYYY").format("MMMM YYYY"))
  // getDaysByMonth(month,year);






  console.log(getDaysByMonth(1,2020));
  // var array = getDaysByMonth(06,2020);
  // array[0].format("YYYY-MM-D");
  // console.log(  array[0].format("YYYY-MM-D"));

  //prendo parametro mese da 1 a 12
  function getDaysByMonth(month,year){
    var daysInMonth = moment(year + "-" + month, "YYYY-MM").daysInMonth();
    console.log(daysInMonth);
    var arrayWithDays = [];
    for (var i = 0; i<daysInMonth; i++) {
      arrayWithDays[i] = moment([year,month-1,i+1])
    }
    return arrayWithDays;
  }


  //trovo le festivita del mese con parametro mese da 1 a 12
  function festivita(month,day) {
    month = month - 1;
    $.ajax(
      {
        url:' https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=' + month,
        method: 'GET',
        success: function (data) {
          console.log(data);
          console.log(data.response);
        },
        error: function() {
            alert("Si è verificato un errore");
        }
      }

    );
  }





//   function getDaysArrayByMonth() {
//   var daysInMonth = moment().daysInMonth();
//   var arrDays = [];
//
//   while(daysInMonth) {
//     var current = moment().date(daysInMonth);
//     arrDays.push(current);
//     daysInMonth--;
//   }
//
//   return arrDays;
// }

});
