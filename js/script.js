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

  //creo Gennaio
  var arrayMonth = getDaysByMonth(data.month,data.year);

  currentMonthCalendary(data.month, arrayMonth);
  // for (var i = 0; i < arrayMonth.length; i++) {
  //   $(".days").append("<li>" + arrayMonth[i].format("D MMMM") + "</li>")
  // }



  // console.log(getDaysByMonth(1,2020));
  // var array = getDaysByMonth(06,2020);
  // array[0].format("YYYY-MM-D");
  // console.log(  array[0].format("YYYY-MM-D"));



  //trovo le festivita del mese con parametro mese da 1 a 12
  function currentMonthCalendary(month, arrayMonth) {
    month = month - 1;
    $.ajax(
      {
        url:' https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=' + month,
        method: 'GET',
        success: function (data) {
          //salvo le feste in un array bidimensionale
          var feste = [
            [],
            []
          ];
          for (var i = 0; i < data.response.length; i++) {
            feste[0][i] = data.response[i].date;
          }
          for (var i = 0; i < data.response.length; i++) {
            feste[1][i] = data.response[i].name;
          }
          console.log(feste);

          //scrivo il calendario
          for (var i = 0; i < arrayMonth.length; i++) {
            if (feste[0].includes(arrayMonth[i].format("YYYY-MM-DD"))) {
              var indice = feste[0].indexOf(arrayMonth[i].format("YYYY-MM-DD"))
              $(".days").append("<li class=\"festa\">" + arrayMonth[i].format("D MMMM") + "-" + "<span>" +feste[1][indice] + "</span>" + "</li>")

            }else {
              $(".days").append("<li>" + arrayMonth[i].format("D MMMM") + "</li>")

            }
            // $(".days").append("<li>" + arrayMonth[i].format("D MMMM") + "</li>")
          }


        },
        error: function() {
            alert("Si è verificato un errore");
        }
      }

    );
  }


  //prendo parametro mese da 1 a 12
  //ritorno array con giorni del mese
  function getDaysByMonth(month,year){
    //catturo giorni in un mese
    var daysInMonth = moment(year + "-" + month, "YYYY-MM").daysInMonth();
    console.log(daysInMonth);
    var arrayWithDays = [];
    for (var i = 0; i<daysInMonth; i++) {
      arrayWithDays[i] = moment([year,month-1,i+1])
    }
    return arrayWithDays;
  }


});
