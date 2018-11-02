'use strict';

function Thermostat () {
  this.STARTING_TEMP = 20
  this.MINIMUM_TEMP = 10
  this.LOW_USAGE = 18
  this.MEDIUM_USAGE = 25
  this.MAX_TEMP_PSM_ON = 25
  this.MAX_TEMP_PSM_OFF = 32
  this.temp = this.STARTING_TEMP
  this.isPowerSaving = true
}

Thermostat.prototype.up = function () {
  this._checkPowerSaving()
  this.temp++
}

Thermostat.prototype.down = function () {
  this._checkMinTemp()
  this.temp--
}

Thermostat.prototype.reset = function () {
  this.temp = this.STARTING_TEMP
}

Thermostat.prototype.usage = function () {
  if (this.temp < this.LOW_USAGE) {
    return 'low-usage';
  } else if (this.temp < this.MEDIUM_USAGE) {
    return 'medium-usage';
  } else {
    return 'high-usage';
  }
}

Thermostat.prototype.switchPowerSavingOn = function () {
  if (this.temp > this.MAX_TEMP_PSM_ON) this.temp = this.MAX_TEMP_PSM_ON
  this.isPowerSaving = true
}

Thermostat.prototype.switchPowerSavingOff = function () {
  this.isPowerSaving = false
}

Thermostat.prototype.powerSavingStatus = function () {
  if (this.isPowerSaving) {
    return 'On'
  } else {
    return 'Off'
  }
}

Thermostat.prototype._checkPowerSaving = function () {
  if (this.temp >= this._maxTemp()) {
    throw new Error('Temperature cannot be higher than ' + this._maxTemp())
  }
}

Thermostat.prototype._checkMinTemp = function () {
  if (this.temp <= this.MINIMUM_TEMP) {
    throw new Error('Temperature cannot be lower than 10')
  }
}

Thermostat.prototype._maxTemp = function () {
  if (this.isPowerSaving) {
    return this.MAX_TEMP_PSM_ON
  } else {
    return this.MAX_TEMP_PSM_OFF
  }
}

module.exports = Thermostat;
