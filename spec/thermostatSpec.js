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

  describe(".up", function() {
    it("increases the temperature by 1", function() {
      thermostat.up();
      expect(thermostat.temp).toEqual(21);
    });
  });
});
