'use strict';

require('chai').should();
const ZtxChainSDK = require('../index');
const BigNumber = require('bignumber.js');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test account Set Privilege Operation', function() {

  it('test operation.accountSetPrivilegeOperation()', async() => {

    const privateKey = 'private key';
    const sourceAddress = 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4';

    // Get nonce
    const result = await sdk.account.getNonce(sourceAddress);
    if (result.errorCode !== 0) {
      console.log(result);
      return;
    }
    let nonce = result.result.nonce;
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // build operation
    let accountSetPrivilegeOperation = sdk.operation.accountSetPrivilegeOperation({
      // signers: [{
      //   address: 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4',
      //   weight: '0'
      // }],
      typeThresholds: [{
        type: '3',
        threshold: '100',
      }],
    });

    if (accountSetPrivilegeOperation.errorCode !== 0) {
      console.log(accountSetPrivilegeOperation);
      return;
    }

    const operationItem = accountSetPrivilegeOperation.result.operation;

    const args = {
      sourceAddress,
      nonce,
      operations: [operationItem],
      signtureNumber: '100',
    };

    let feeData = await sdk.transaction.evaluateFee(args);
    if (feeData.errorCode !== 0) {
      console.log(feeData);
      return;
    }

    let feeLimit = feeData.result.feeLimit;
    let gasPrice = feeData.result.gasPrice;

    console.log(feeData);
  });


});
