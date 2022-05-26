'use strict';

require('chai').should();
const BigNumber = require('bignumber.js');
const co = require('co');

const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('Test contract invoke by asset operation transaction', function() {

  it('test contract invoke by asset operation' , function() {

    const privateKey = 'private key';
    const sourceAddress = 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4';
    // const contractAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    const contractAddress = 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4';
    co(function* () {
      const result = yield sdk.account.getNonce(sourceAddress);

      if (result.errorCode !== 0) {
        console.log(result);
        return;
      }
      let nonce = result.result.nonce;

      nonce = new BigNumber(nonce).plus(1).toString(10);

      let contractInvokeByGasOperation = yield sdk.operation.contractInvokeByAssetOperation({
        contractAddress,
        sourceAddress,
        assetAmount: '1000',
        input: 'aaaa',
        code: 'leo',
        issuer: 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3',
        // metadata: 'Test contract create operation',
      });

      if (contractInvokeByGasOperation.errorCode !== 0) {
        console.log(contractInvokeByGasOperation);
        return;
      }

      // console.log(contractInvokeByGasOperation);
      // return;
      const operationItem = contractInvokeByGasOperation.result.operation;

      const args = {
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '100',
        // metadata: 'Test evaluation fee',
      };

      let feeData = yield sdk.transaction.evaluateFee(args);
      if (feeData.errorCode !== 0) {
        console.log(feeData);
        return;
      }

      let feeLimit = feeData.result.feeLimit;
      let gasPrice = feeData.result.gasPrice;

      // 2. build blob
      let blobInfo = sdk.transaction.buildBlob({
        sourceAddress: sourceAddress,
        gasPrice,
        feeLimit,
        nonce: nonce,
        operations: [ operationItem ],
      });

      if (blobInfo.errorCode !== 0) {
        console.log(blobInfo);
        return;
      }

      let blob = blobInfo.result.transactionBlob;

      // 3. sign blob
      let signatureInfo = sdk.transaction.sign({
        privateKeys: [ privateKey ],
        blob,
      });

      if (signatureInfo.errorCode !== 0) {
        console.log(signatureInfo);
        return;
      }

      let signature = signatureInfo.result.signatures;
      // 4. submit transaction
      let transactionInfo = yield sdk.transaction.submit({
        blob,
        signature: signature,
      });

      console.log(transactionInfo);

    }).catch(err => {
      console.log(err);
    });
  });

});
