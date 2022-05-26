'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test account activate operation', function() {

  it('test operation.accountActivateOperation()', function() {

    let data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
      metadata: 'Test Account Activate',
    });

    data.should.be.a('object');
    data.errorCode.should.equal(0);
    data.result.should.have.property('operation').be.a('object');
    data.result.operation.should.have.property('type');
    data.result.operation.should.have.property('data');
    data.result.operation.type.should.equal('activateAccount');

    // Invalid sourceAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: '',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11002);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: null,
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11002);

    // Invalid destAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: '',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11003);

    // sourceAddress === destAddress
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
    });
    data.errorCode.should.equal(11005);

    // Invalid initBalance
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: 1000,
    });
    data.errorCode.should.equal(11004);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '',
    });
    data.errorCode.should.equal(11004);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
    });
    data.errorCode.should.equal(11004);

    // Invalid metadata
    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
      metadata: '',
    });
    data.errorCode.should.equal(15028);

    data = sdk.operation.accountActivateOperation({
      sourceAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      destAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      initBalance: '1000',
      metadata: 123,
    });
    data.errorCode.should.equal(15028);

  });

});
