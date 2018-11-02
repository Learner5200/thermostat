$( document ).ready(function() {

  var thermostat = new Thermostat();
  // getCity();
  getSettings();

  function updateTemp() {
    $('#temperature').text( thermostat.temp + " degrees")
    $('#temperature').attr('class', thermostat.usage())
  }

  $(document).click(function() {
    updateTemp();
  });

  $( "#tempUp" ).click(function( event ) {
    thermostat.up();
    setTemp();
  });

  $( "#tempDown" ).click(function( event ) {
    thermostat.down();
    setTemp();
  });

  $( "#reset" ).click(function( event ) {
    thermostat.reset();
    setTemp();
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
    setCity(city);
  })

  function requestFailure(xhr, status, errorThrown) {
    alert( "There was a problem making your request: please check the console.")
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  };

  function getSettings() {
    var request = $.ajax({
      url: "http://localhost:4567/",
      dataType: "json"
    });
    request.done(function(text) {
      thermostat.temp = Number(text.temperature);
      updateTemp();
      getWeather(text.city);
    });
    request.fail(requestFailure);
  }
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
    request.fail(requestFailure);
  }

  function setTemp() {
    var request = $.ajax({
      url: "http://localhost:4567/temp",
      data: { temp: thermostat.temp },
      method: "post"
    });
    request.fail(requestFailure);
  };

  function setCity(city) {
    var request = $.ajax({
      url: "http://localhost:4567/city",
      data: { city: city },
      method: "post"
    });
    request.fail(requestFailure);
  };
});
