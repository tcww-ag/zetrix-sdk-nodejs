'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test asset issue operation', function() {
  it('test operation.assetIssueOperation(args)', function() {
    let data = sdk.operation.assetIssueOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      assetAmount: '20000',
      metadata: 'oh my issue asset',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('operation');
    data.result.operation.should.be.a('object');
    data.result.operation.should.have.property('type').equal('issueAsset');
    data.result.operation.should.have.property('data');

    // Invalid sourceAddress
    data = sdk.operation.assetIssueOperation({
      sourceAddress: '',
      code: 'leo',
      assetAmount: '20000',
      metadata: 'oh my issue asset',
    });
    data.errorCode.should.equal(11002);

    // sourceAddress is undefined
    data = sdk.operation.assetIssueOperation({
      code: 'leo',
      assetAmount: '20000',
      metadata: 'oh my issue asset',
    });
    data.errorCode.should.equal(0);

    // Invalid code
    data = sdk.operation.assetIssueOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: '',
      assetAmount: '20000',
      metadata: 'oh my issue asset',
    });
    data.errorCode.should.equal(11023);

    // Invalid assetAmount
    data = sdk.operation.assetIssueOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      assetAmount: '',
      metadata: 'oh my issue asset',
    });
    data.errorCode.should.equal(11024);

    // Invalid metadata
    data = sdk.operation.assetIssueOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      assetAmount: '20000',
      metadata: '',
    });
    data.errorCode.should.equal(15028);

    // metadata is undefined
    data = sdk.operation.assetIssueOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'leo',
      assetAmount: '20000',
    });
    data.errorCode.should.equal(0);
  });
});
