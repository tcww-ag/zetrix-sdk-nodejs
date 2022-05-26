'use strict';

const wrap = require('co-wrap-all');
const merge = require('merge-descriptors');
const BigNumber = require('bignumber.js');
const is = require('is-type-of');
const long = require('long');

module.exports = Util;

function Util(options) {
  if (!(this instanceof Util)) {
    return new Util(options);
  }

  this.options = options;
}

const proto = Util.prototype;

merge(proto, require('../common/util'));

proto.isBigNumber = function (object) {
  return this._isBigNumber(object);
};

proto.toBigNumber = function(data) {
  return this._toBigNumber(data);
};

proto.utfToHex = function(str) {
  if (!is.string(str)) {
    return;
  }

  return Buffer.from(str, 'utf8').toString('hex');
};

proto.hexToUtf = function(str) {
  if (!is.string(str) ||
      str === '' ||
      !this._isHexString(str)) {
    return;
  }

  return Buffer.from(str, 'hex').toString('utf8');
};

proto.gasToUGas = function(gas) {
  if (!this._isAvailableZtx(gas)) {
    return '';
  }

  const oneMo = Math.pow(10, 6);
  const ugas = new BigNumber(gas).times(oneMo);
  return ugas.toString();
};

proto.ugasToGas = function(ugas) {
  if (!this._isAvailableValue(ugas)) {
    return '';
  }

  const oneMo = Math.pow(10, 6);
  const gas = new BigNumber(ugas).dividedBy(oneMo);
  return gas.toString();
};

proto.unitWithDecimals = function(amount, decimals) {
  const reg = /^[0-9]+$/;

  if (!reg.test(amount) || !reg.test(decimals)) {
    return false;
  }

  amount = new BigNumber(amount);
  decimals = new BigNumber(Math.pow(10, decimals));
  const amountWithDecimals = amount.times(decimals);

  if (amountWithDecimals.isGreaterThanOrEqualTo(0) && amountWithDecimals.isLessThanOrEqualTo(long.MAX_VALUE.toString())) {
    return amountWithDecimals.toString();
  }
  return false;
}

wrap(proto);
