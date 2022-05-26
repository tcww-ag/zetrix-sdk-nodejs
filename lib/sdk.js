'use strict';

const merge = require('merge-descriptors');
const wrap = require('co-wrap-all');
const is = require('is-type-of');
const Util = require('./util');
const Account = require('./account');
const Token = require('./token');
const Block = require('./blockchain/block');
const Transaction = require('./blockchain/transaction');
const Operation = require('./operation');
const Contract = require('./contract');

module.exports = ZtxChainSDK;

function ZtxChainSDK(options) {
  if (!(this instanceof ZtxChainSDK)) {
    return new ZtxChainSDK(options);
  }

  if (options && options.inited) {
    this.options = options;
  } else {
    this.options = ZtxChainSDK.initOptions(options);
  }

  this.util = new Util(this.options);
  this.account = new Account(this.options);
  this.transaction = new Transaction(this.options);
  this.token = new Token(this.options);
  this.block = new Block(this.options);
  this.operation = new Operation(this.options);
  this.contract = new Contract(this.options);
}

ZtxChainSDK.initOptions = function initOptions(options) {
  if (!is.object(options)) {
    throw new Error('options is require, it must be an object');
  }

  if (!is.string(options.host)) {
    throw new Error('host must be a non-empty string');
  }

  const chainId = options.chainId || 0;
  const timeout =  options.timeout || 15*1000;

  if (!is.number(chainId)) {
    throw new Error('chainId must be a number');
  }

  if (!is.number(timeout)) {
    throw new Error('timeout must be a number');
  }

  const opts = {};

  Object.keys(options).forEach(key => {
    if (options[key] !== undefined) {
      opts[key] = options[key];
    }
  });

  opts.secure = opts.secure || false;

  opts.chainId = chainId;
  opts.timeout = timeout;
  opts.inited = true;
  return opts;
};
