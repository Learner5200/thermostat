var Thermostat = require("../lib/thermostat")

describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe(".temp", function() {
    it("starts at 20", function() {
      expect(thermostat.temp).toEqual(20);
    });
  });
});
