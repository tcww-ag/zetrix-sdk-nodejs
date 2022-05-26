'use strict';

const ZtxChainSDK = require('./lib/sdk');

if (typeof window !== 'undefined' && typeof window.ZtxChainSDK === 'undefined') {
  window.ZtxChainSDK = ZtxChainSDK;
}

module.exports = ZtxChainSDK;
