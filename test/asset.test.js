'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test asset service', function() {

  it('test asset.getInfo()', async() => {
    let data = await sdk.token.asset.getInfo({
      address: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'BTC',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('assets');
    data.result.assets.should.be.a('array');

    // empty argument
    data = await sdk.token.asset.getInfo();
    data.errorCode.should.equal(15016);

    // invalid address
    data = await sdk.token.asset.getInfo({
      address: '',
      code: 'BTC',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
    });
    data.errorCode.should.equal(11006);

    // invalid code
    data = await sdk.token.asset.getInfo({
      address: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: '',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
    });
    data.errorCode.should.equal(11023);

    // invalid issuer address
    data = await sdk.token.asset.getInfo({
      address: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'BTC',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3A',
    });
    data.errorCode.should.equal(11027);

    // BTCDEMO asset does not exist
    data = await sdk.token.asset.getInfo({
      address: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      code: 'BTCDEMO',
      issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
    });
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.should.have.property('assets');
    data.result.assets.should.have.lengthOf(0);
  });

});
