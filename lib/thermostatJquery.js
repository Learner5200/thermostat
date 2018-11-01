$( document ).ready(function() {

  var thermostat = new Thermostat();

  getTime();


  $(document).click(function() {
    $('#temperature').text( thermostat.temp + " degrees")
    $('#temperature').attr('class', thermostat.usage())
  });

  $( "#tempUp" ).click(function( event ) {
    thermostat.up();
    setTime();
  });

  $( "#tempDown" ).click(function( event ) {
    thermostat.down();
    setTime();
  });

  $( "#reset" ).click(function( event ) {
    thermostat.reset();
    setTime();
  });

  $( "#switchPowerSavingOn" ).click(function( event ) {
    thermostat.switchPowerSavingOn();
    $( "#switchPowerSavingOn" ).attr('class', "button-on")
    $( "#switchPowerSavingOff" ).attr('class', "button-off")
  });

  $( "#switchPowerSavingOff" ).click(function( event ) {
    thermostat.switchPowerSavingOff();
    $( "#switchPowerSavingOn" ).attr('class', "button-off")
    $( "#switchPowerSavingOff" ).attr('class', "button-on")
  });

  $('#city-input-form').submit(function (event) {
    event.preventDefault();
    var city = $('#city-input').val();
    console.log(city);
    getWeather(city);
  })

  function setTime() {
    var request = $.ajax({
      url: "http://localhost:4567",
      data: { temp: thermostat.temp },
      method: "post"
    });
    request.done(function() {
      alert("worked!");
    });
    request.fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, no")
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });
  };

  function getTime() {
    var request = $.ajax({
      url: "http://localhost:4567",
      data: {}
    });
    request.done(function(text) {
      alert("worked! " + text);
      thermostat.temp = Number(text);
      $('#temperature').text( thermostat.temp + " degrees");
    });
    request.fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, no")
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
    });
  };

  function getWeather(city) {
    var request = $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        units: "metric",
        APPID: "3468bebd68f9567aac8f3faaad4f166e",
        q: city
      }
    });

    request.done(function(json) {
      $("#weather").text("The weather in " + json.name + " is " + json.main.temp + " degrees")
    });

    request.fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, " + city + " is not a valid city" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
    });
  }
});
