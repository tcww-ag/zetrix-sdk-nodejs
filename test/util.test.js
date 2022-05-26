'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');


const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test util', function() {

  it('test utfToHex(string)', function() {
    let data = sdk.util.utfToHex('hello, world');
    data.should.equal('68656c6c6f2c20776f726c64');

    data = sdk.util.utfToHex('');
    data.should.equal('');

    data = sdk.util.utfToHex();
    let result = (data === undefined);
    result.should.equal(true);
  });

  it('test hexToUtf(string)', function() {
    let data = sdk.util.hexToUtf('68656c6c6f2c20776f726c64');
    data.should.equal('hello, world');

    let result;
    data = sdk.util.hexToUtf('');
    result = (data === undefined);
    result.should.equal(true);

    data = sdk.util.hexToUtf();
    result = (data === undefined);
    result.should.equal(true);

    data = sdk.util.hexToUtf('hello, world');
    result = (data === undefined);
    result.should.equal(true);
  });

  it('test gasToUGas(string)', function() {
    let data = sdk.util.gasToUGas('5');
    data.should.equal('500000000');

    data = sdk.util.gasToUGas(5);
    data.should.equal('');

    data = sdk.util.gasToUGas();
    data.should.equal('');

    data = sdk.util.gasToUGas('');
    data.should.equal('');

    data = sdk.util.gasToUGas('abc');
    data.should.equal('');

    data = sdk.util.gasToUGas('0.1');
    data.should.equal('10000000');

    data = sdk.util.gasToUGas('-1');
    data.should.equal('');
  });

  it('test ugasToGas(string)', function() {
    let data = sdk.util.ugasToGas('500000000');
    data.should.equal('5');

    data = sdk.util.ugasToGas('0');
    data.should.equal('0');

    data = sdk.util.ugasToGas('');
    data.should.equal('');

    data = sdk.util.ugasToGas();
    data.should.equal('');

    data = sdk.util.ugasToGas('abc');
    data.should.equal('');

    data = sdk.util.ugasToGas('-1');
    data.should.equal('');

    data = sdk.util.ugasToGas(-1);
    data.should.equal('');

    data = sdk.util.ugasToGas('0.1');
    data.should.equal('');
  });


});
