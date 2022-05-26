'use strict';

require('chai').should();
const BigNumber = require('bignumber.js');
const co = require('co');

const ZtxChainSDK = require('../index');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
  // host: '192.168.1.162:56002',
});

describe('Test transaction', function() {


  it('evaluateFee', function() {
    const sourceAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    const destAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';

    sdk.account.getNonce(sourceAddress).then(info => {


      if (info.errorCode !== 0) {
        console.log(info);
        return;
      }
      const nonce = new BigNumber(info.result.nonce).plus(1).toString(10);

      let sendGasOperation = sdk.operation.gasSendOperation({
        destAddress,
        gasAmount: '60000',
        // metadata: 'oh my send gas',
      });


      if (sendGasOperation.errorCode !== 0) {
        console.log(sendGasOperation);
        return;
      }

     const operationItem = sendGasOperation.result.operation;

      // evaluation fee
      const args = {
        sourceAddress,
        nonce,
        operations: [operationItem],
        signtureNumber: '1',
        // ceilLedgerSeq: '30',
        // metadata: 'Test evaluation fee',
      };


      sdk.transaction.evaluateFee(args).then(feeData => {
        console.log(feeData)
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });
  });

  it('test getInfo', function() {
    const hash = 'e21fb61a66e251ec2cb593ab09781daaacaea6701f2ac2f26eb867d8e60324ba';
    sdk.transaction.getInfo(hash).then(data => {
      // console.log(data);
    })
  });

  it('transaction', function() {
    const privateKey = 'private key';
    const sourceAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    const destAddress = 'ZTX3KepoBV7f7PmjLUF8BZxNydh62r4z8dfm4';

    co(function* () {
      const result = yield sdk.account.getNonce(sourceAddress);

      if (result.errorCode !== 0) {
        console.log(result);
        return;
      }
      let nonce = result.result.nonce;
      nonce = new BigNumber(nonce).plus(1).toString(10);

      // 1.build operation
      let sendZtxInfo = sdk.operation.gasSendOperation({
        // sourceAddress,
        destAddress,
        gasAmount: '10000000',
        // metadata: 'oh my send gas',
      });

      if (sendZtxInfo.errorCode !== 0) {
        console.log(sendZtxInfo);
        return;
      }

      const sendGasOperation = sendZtxInfo.result.operation;
      // console.log(sendGasOperation);
      // return;
      // evaluation fee
      // const args = {
      //   sourceAddress,
      //   nonce,
      //   operations: [sendGasOperation],
      //   signtureNumber: '100',
      //   // metadata: 'Test evaluation fee',
      // };
      //
      // let feeData = yield sdk.transaction.evaluateFee(args);
      //
      // if (feeData.errorCode !== 0) {
      //   console.log(feeData);
      //   return;
      // }
      // const feeLimit = feeData.result.feeLimit;
      // const gasPrice = feeData.result.gasPrice;

      // 2. build blob
      let blobInfo = sdk.transaction.buildBlob({
        sourceAddress,
        gasPrice: '1000',
        feeLimit: '14119000',
        nonce,
        // ceilLedgerSeq: '',
        operations: [ sendGasOperation ],
        // metadata: '6f68206d79207478',
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
        signatureInfo.errorCode.should.equal(11058);
        // console.log(signatureInfo);
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
