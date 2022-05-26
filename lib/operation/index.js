'use strict';

const wrap = require('co-wrap-all');
const is = require('is-type-of');
const merge = require('merge-descriptors');
const long = require('long');
const JSONbig = require('json-bigint');
const { keypair } = require('zetrix-encryption-nodejs');
const errors = require('../exception');
module.exports = Operation;

function Operation(options) {
  if (!(this instanceof Operation)) {
    return new Operation(options);
  }

  this.options = options;
}

const proto = Operation.prototype;

merge(proto, require('../common/util'));
merge(proto, require('./gas'));
merge(proto, require('./asset'));
merge(proto, require('./account'));
merge(proto, require('./log'));
merge(proto, require('./contract'));

wrap(proto);
