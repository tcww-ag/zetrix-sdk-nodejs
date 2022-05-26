'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test zetrix-sdk account service', function() {

  it('test account.create()', async() => {
    const keypair = await sdk.account.create();
    keypair.errorCode.should.equal(0);
    keypair.result.should.be.a('object');
    keypair.result.should.have.property('privateKey').with.lengthOf(56);
    keypair.result.should.have.property('publicKey').with.lengthOf(76);
    keypair.result.should.have.property('address').with.lengthOf(37);
  });


  it('test account.getInfo(address)', async() => {
    let address = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    let data = await sdk.account.getInfo(address);
    data.should.be.a('object');
    data.errorCode.should.equal(0);

    address = '';
    data = await sdk.account.getInfo(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);

    address = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    data = await sdk.account.getInfo(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);

    address = 100;
    data = await sdk.account.getInfo(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);
  });

  it('test account.checkValid(address)', async() => {
    let data = await sdk.account.checkValid('ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3');
    data.should.be.a('object');
    data.result.should.be.a('object');
    data.result.should.have.property('isValid').equal(true);

    data = await sdk.account.checkValid('ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3');
    data.should.be.a('object');
    data.result.should.be.a('object');
    data.result.should.have.property('isValid').equal(false);

    data = await sdk.account.checkValid('');
    data.should.be.a('object');
    data.result.should.be.a('object');
    data.result.should.have.property('isValid').equal(false);


    data = await sdk.account.checkValid(123);
    data.should.be.a('object');
    data.result.should.be.a('object');
    data.result.should.have.property('isValid').equal(false);
  });

  it('test account.getBalance(address)', async() => {
    let address = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    let data = await sdk.account.getBalance(address);
    data.should.be.a('object');
    data.errorCode.should.equal(0);
    data.result.should.have.property('balance');

    address = '';
    data = await sdk.account.getBalance(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);

    address = '123';
    data = await sdk.account.getBalance(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);

    address = 123;
    data = await sdk.account.getBalance(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);
  });

  it('test account.getNonce(address)', async() => {
    let address = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    let data = await sdk.account.getNonce(address);
    data.should.be.a('object');
    data.errorCode.should.equal(0);
    data.result.should.have.property('nonce');

    address = '';
    data = await sdk.account.getNonce(address);
    data.should.be.a('object');
    data.errorCode.should.equal(11006);
  });

  it('test account.getMetadata()', async() => {
    let data = await sdk.account.getMetadata({
      address: 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4',
      key: 'mykey1'
    });
    console.log(data);
    console.log(JSON.stringify(data));
  });

  it('test account.isActivated()', async() => {
    let data = await sdk.account.isActivated('ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4');
    data.errorCode.should.equal(0);
    data.result.isActivated.should.equal(true);

    data = await sdk.account.isActivated('ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3');
    data.errorCode.should.equal(0);
    data.result.isActivated.should.equal(false);

    data = await sdk.account.isActivated();
    data.errorCode.should.equal(15016);

    data = await sdk.account.isActivated('');
    data.errorCode.should.equal(11006);

  });

});
