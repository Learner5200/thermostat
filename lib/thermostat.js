function Thermostat() {
  this.temp = 20;
  this.minimum = 10
  this.maximum = 25
};

Thermostat.prototype.up = function() {
  if (this.temp === this.maximum) {
    throw("Maximum temperature reached");
  };
  this.temp += 1;
};

Thermostat.prototype.down = function() {
  if (this.temp === this.minimum) {
    throw("Minimum temperature reached");
  };
  this.temp -= 1;
};

module.exports = Thermostat;
