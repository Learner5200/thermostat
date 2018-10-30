var Thermostat = require("../lib/thermostat")
'use strict';

describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe(".temp", function() {
    it("starts at 20", function() {
      expect(thermostat.getCurrentTemp()).toEqual(20);
    });
  });

  describe(".up", function() {
    it("increases the temperature by 1", function() {
      thermostat.up();
      expect(thermostat.getCurrentTemp()).toEqual(21);
    });

    it("does not increase temperature above maximum", function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();
      };
      expect(function(){ thermostat.up(); }).toThrow("Maximum temperature reached");
    });
  });

  describe(".down", function() {
    it("decreases the temperature by 1", function() {
      thermostat.down();
      expect(thermostat.getCurrentTemp()).toEqual(19);
    });

    it("does not decrease temperature below minimum", function() {
      for (var i = 0; i < 10; i++) {
        thermostat.down();
      };
      expect(function(){ thermostat.down(); }).toThrow("Minimum temperature reached");
    });
  });

  describe("maximum", function() {
    it("is 25 when power saving mode is on", function() {
      expect(thermostat.maximum).toEqual(25);
    });

    it("is 32 when power saving mode is off", function() {
      thermostat.powerSavingOff()
      expect(thermostat.maximum).toEqual(32);
    });
  });

  describe(".reset", function() {
    it("sets temperature back to default", function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.getCurrentTemp()).toEqual(thermostat.DEFAULT);
    })
  })

  describe(".usage", function() {
    it("returns 'low' when temp < 18", function() {
      for (var i = 0; i < 3; i++) {
        thermostat.down();
      };
      expect(thermostat.usage()).toEqual('low');
    })

    it("returns 'medium' when temp < 25", function() {
      expect(thermostat.usage()).toEqual('medium');
    })

    it("returns 'high' when temp >= 25", function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();
      };
      expect(thermostat.usage()).toEqual('high');
    })
  })
});
