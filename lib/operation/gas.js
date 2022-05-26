'use strict';

const is = require('is-type-of');
const errors = require('../exception');

const proto = exports;

proto.gasSendOperation = function(args) {
  try {

    if (is.array(args) || !is.object(args)) {
      return this._responseError(errors.INVALID_ARGUMENTS);
    }

    const schema = {
      sourceAddress: {
        required: false,
        address: true,
      },
      destAddress: {
        required: true,
        address: true,
      },
      metadata: {
        required: false,
        string: true,
      }
    };

    if (!this._validate(args, schema).tag) {
      const msg = this._validate(args, schema).msg;
      return this._responseError(errors[msg]);
    }

    if (!is.undefined(args.gasAmount)) {
      if (!this._isAvailableValue(args.gasAmount)) {
        return this._responseError(errors.INVALID_GAS_AMOUNT_ERROR);
      }
    }

    if (args.sourceAddress && args.destAddress === args.sourceAddress) {
      return this._responseError(errors.SOURCEADDRESS_EQUAL_DESTADDRESS_ERROR);
    }

    if (args.gasAmount === '0') {
      delete args.gasAmount;
    }

    return this._responseData({
      operation: {
        type: 'payCoin',
        data: args,
      },
    });
  } catch (err) {
    throw err;
  }
};
