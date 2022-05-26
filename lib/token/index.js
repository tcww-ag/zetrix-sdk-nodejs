'use strict';

const Asset = require('./asset');

module.exports = Collection;

function Collection(options) {
  if (!(this instanceof Collection)) {
    return new Collection(options);
  }

  this.options = options;

  this.asset = new Asset(options);
}
