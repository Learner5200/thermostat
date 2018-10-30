function Thermostat() {
  this.temp = 20;
};

Thermostat.prototype.up = function() {
  this.temp += 1;
};

module.exports = Thermostat;
