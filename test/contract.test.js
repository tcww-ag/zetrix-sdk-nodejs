'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test zetrix-sdk contract service', function() {

  it('test contract.getInfo()', async() => {
    let data = await sdk.contract.getInfo('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4');
    data.errorCode.should.equal(0);
    data = await sdk.contract.getInfo('ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3');
    data.errorCode.should.equal(11038);
    data = await sdk.contract.getInfo('ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3A');
    data.errorCode.should.equal(11006);

    data = await sdk.contract.getInfo('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4');
    data.errorCode.should.equal(11038);

  });

  it('test contract.checkValid()', async() => {

    let data = await sdk.contract.checkValid('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4');
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.isValid.should.equal(false);

    data = await sdk.contract.checkValid('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4');
    data.errorCode.should.equal(0);
    data.result.should.be.a('object');
    data.result.isValid.should.equal(true);

    data = await sdk.contract.checkValid('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4A');
    data.errorCode.should.equal(11037);
  });

  it('test contract.getAddress()', async() => {
    let hash = 'f298d08ec3987adc3aeef73e81cbb49cbad2316145ba190700de2d78657880c0';
    // hash = 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4A';
    let data = await sdk.contract.getAddress(hash);
    console.log(data);
    console.log(JSON.stringify(data))
  });

  it('test contract.call()', async() => {

    let data = await sdk.contract.call({
      optType: 2,
      // code: 'leo'
      // contractAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      contractAddress: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
      input: JSON.stringify({
        // method: 'contractInfo',
        method: 'name',
      }),
    });
    console.log(JSON.stringify(data));
  });

});
