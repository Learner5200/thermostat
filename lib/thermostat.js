'use strict';

function Thermostat() {
  this.DEFAULT = 20;
  this.MINIMUM = 10;
  this.POWER_SAVING_ON_MAX = 25
  this.POWER_SAVING_OFF_MAX = 32
  this.maximum = this.POWER_SAVING_ON_MAX;
  this.temp = this.DEFAULT;
  this.powerSavingMode = true;

};

Thermostat.prototype.getCurrentTemp = function() {
  return this.temp;
}

Thermostat.prototype.up = function() {
  if (this.temp === this.maximum) {
    throw("Maximum temperature reached");
  };
  this.temp += 1;
};

Thermostat.prototype.down = function() {
  if (this.temp === this.MINIMUM) {
    throw("Minimum temperature reached");
  };
  this.temp -= 1;
};

Thermostat.prototype.powerSavingOn = function() {
  this.powerSavingMode = true;
  this.maximum = this.POWER_SAVING_ON_MAX;
}
Thermostat.prototype.powerSavingOff = function() {
  this.powerSavingMode = false;
  this.maximum = this.POWER_SAVING_OFF_MAX;
}

Thermostat.prototype.reset = function() {
  this.temp = this.DEFAULT;
}

Thermostat.prototype.usage = function () {
  if (this.temp < 18) return "low";
  if (this.temp < 25) return "medium";
  return "high";
};

module.exports = Thermostat;
