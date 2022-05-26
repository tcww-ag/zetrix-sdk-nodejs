'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test asset send operation', function() {

  it('test operation.assetSendOperation(args)', function() {
    let data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('operation');
    data.result.operation.should.be.a('object');
    data.result.operation.should.have.property('type').equal('payAsset');
    data.result.operation.should.have.property('data');

    // sourceAddress === destAddress
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11005);

    // Invalid sourceAddress
    data = sdk.operation.assetSendOperation({
      sourceAddress: '',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11002);

    // sourceAddress is undefined
    data = sdk.operation.assetSendOperation({
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(0);

    // Invalid code
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: '',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11023);

    // Invalid assetAmount
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '',
      metadata: 'oh my test send asset',
    });
    data.errorCode.should.equal(11024);

    // Invalid metadata
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
      metadata: '',
    });
    data.errorCode.should.equal(15028);

    // metadata is undefined
    data = sdk.operation.assetSendOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      assetAmount: '100',
    });
    data.errorCode.should.equal(0);
  });
});
