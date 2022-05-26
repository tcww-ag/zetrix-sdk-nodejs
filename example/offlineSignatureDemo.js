'use strict';

require('chai').should();
const ZtxChainSDK = require('zetrix-sdk');

const sdk = new ZtxChainSDK({
  host: 'http://192.168.10.100:19343',
});

describe('The demo of offline signature', function() {

  // ====================================
  // Take `gasSendOperation` as an example
  // Offline signature contains 2 steps:
  // step1. Get blob
  // step2. Sign blob with sender private key
  // ====================================
  it('The demo of offline signature', async() => {
    const senderPrivateKey = 'sender private key';
    const senderAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    const receiverAddress = 'ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3';
    // The unit is UGAS
    const gasPrice = '1000';
    // The unit is UGAS
    const feeLimit = '306000';
    // The unit is UGAS
    const gasAmount = '7000';
    // Transaction initiation account's Nonce + 1
    const nonce = '10';
    const metadata = 'send gas demo';

    // build operation (gasSendOperation)
    const operationInfo = sdk.operation.gasSendOperation({
      sourceAddress: senderAddress,
      destAddress: receiverAddress,
      gasAmount,
      metadata,
    });

    if (operationInfo.errorCode !== 0) {
      console.log(operationInfo);
      return;
    }

    const operationItem = operationInfo.result.operation;

    // ====================================
    // step1. Get blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: senderAddress,
      gasPrice,
      feeLimit,
      nonce,
      operations: [ operationItem ],
    });

    if (blobInfo.errorCode !== 0) {
      console.log(blobInfo);
      return;
    }

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // step2. Sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ senderPrivateKey ],
      blob,
    });

    if (signatureInfo.errorCode !== 0) {
      console.log(signatureInfo);
      return;
    }

    const signature = signatureInfo.result.signatures;

    console.log(signature);
  });

});
