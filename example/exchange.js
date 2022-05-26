'use strict';

require('chai').should();
const BigNumber = require('bignumber.js');
const ZtxChainSDK = require('../lib/sdk');
const assert = require('assert');

const sdk = new ZtxChainSDK({
  host: '192.168.4.131:18333',
});

let genesisAccount = "ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3";
let genesisAccountPriv = "privBwYirzSUQ7ZhgLbDpRXC2A75HoRtGAKSF76dZnGGYXUvHhCK4xuz";
let newAddress = "";
let newPriv = "";
let txHash = "";
let txBlockNum = "0";
let contractAddress ="";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('The demo of zetrix-sdk for exchange ', function() {
  it('Create account', async() => {
    const keypair = await sdk.account.create();
    assert.strictEqual(keypair.errorCode, 0, "创建账户失败");
    newAddress = keypair.result.address;
    newPriv = keypair.result.privateKey;
    console.log(keypair);
  });

  it('Check address validity', async() => {
    const data = await sdk.account.checkValid(newAddress);
    assert.strictEqual(data.errorCode, 0, "校验用户地址失败");
    assert.strictEqual(data.result.isValid, true, "用户地址无效");
  });

  // ====================================
  // Activate account contains 4 steps:
  // 1. build operation (AccountActivateOperation)
  // 2. build blob
  // 3. sign blob with sender private key
  // 4. submit transaction
  // ====================================
  it('Activate account', async () => {
    const accountInfo = await sdk.account.getNonce(genesisAccount);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.accountActivateOperation({
      sourceAddress: genesisAccount,
      destAddress: newAddress,
      initBalance: '0',
      metadata: 'activate account',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: genesisAccount,
      gasPrice: '1000',
      feeLimit: '1000000',
      nonce,
      operations: [operationItem],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [genesisAccountPriv],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Activate account sleep', async () => {
    await sleep(1500);
  });

  it('Activate account sleep', async () => {
    await sleep(1500);
  });

  it('Get Account Nonce', async() => {
    const data = await sdk.account.getNonce(newAddress);
    assert.strictEqual(data.errorCode, 0, "获取用户nonce失败");
  });

  it('Get Account Info', async() => {
    const info = await sdk.account.getInfo(newAddress);
    assert.strictEqual(info.errorCode, 0, "获取用户信息失败");
  });

  // ====================================
  // Send Gas contains 4 steps:
  // 1. build operation (gasSendOperation)
  // 2. build blob
  // 3. sign blob with sender private key
  // 4. submit transaction
  // ====================================
  it('Send Gas', async() => {
    const accountInfo = await sdk.account.getNonce(genesisAccount);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.gasSendOperation({
      sourceAddress: genesisAccount,
      destAddress: newAddress,
      gasAmount: '7000000000',
      metadata: 'send gas demo',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: genesisAccount,
      gasPrice: '1000',
      feeLimit: '1060000',
      nonce,
      operations: [ operationItem ],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ genesisAccountPriv ],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Send Gas Sleep', async () => {
    await sleep(1500);
  });

  it('Send Gas Sleep', async () => {
    await sleep(1500);
  });

  it('Get Account Balance', async() => {
    const info = await sdk.account.getBalance(newAddress);
    assert.strictEqual(info.errorCode, 0, "获取用户余额失败");
  });

  it('Issue Asset', async() => {
    const accountInfo = await sdk.account.getNonce(genesisAccount);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.assetIssueOperation({
      sourceAddress: genesisAccount,
      code: 'TST',
      assetAmount: '70000000000',
      metadata: 'issue asset',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: genesisAccount,
      gasPrice: '1000',
      feeLimit: '51000000',
      nonce,
      operations: [ operationItem ],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ genesisAccountPriv ],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Issue Asset Sleep', async () => {
    await sleep(1500);
  });

  it('Issue Asset Sleep', async () => {
    await sleep(1500);
  });

  it('Get Asset', async() => {
    const assetKey = {
      address: genesisAccount,
      code: 'TST',
      issuer: genesisAccount
    };
    const info = await sdk.token.asset.getInfo(assetKey);
    assert.strictEqual(info.errorCode, 0, "获取资产信息失败");
    console.log(info);
  });

  it('Send Asset', async() => {
    const accountInfo = await sdk.account.getNonce(genesisAccount);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.assetSendOperation({
      sourceAddress: genesisAccount,
      destAddress: newAddress,
      code: 'TST',
      issuer: genesisAccount,
      assetAmount: '0',
      metadata: 'send asset',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: genesisAccount,
      gasPrice: '1000',
      feeLimit: '1060000',
      nonce,
      operations: [ operationItem ],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ genesisAccountPriv ],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Send Asset Sleep', async () => {
    await sleep(1500);
  });

  it('Send Asset Sleep', async () => {
    await sleep(1500);
  });

  it('Get Account Assets', async() => {
    const info = await sdk.account.getAssets(newAddress);
    assert.strictEqual(info.errorCode, 0, "获取账户资产失败");
    console.log(info);
  });

  it('Set Metadata', async() => {
    const accountInfo = await sdk.account.getNonce(genesisAccount);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.accountSetMetadataOperation({
      sourceAddress: genesisAccount,
      key: 'test',
      value: '1234567890',
      metadata: 'set metadata',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: genesisAccount,
      gasPrice: '1000',
      feeLimit: '1060000',
      nonce,
      operations: [ operationItem ],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [ genesisAccountPriv ],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Set Metadata Sleep', async () => {
    await sleep(1500);
  });

  it('Set Metadata Sleep', async () => {
    await sleep(1500);
  });

  it('Get Metadata', async() => {
    const metadataKey = {
      address: genesisAccount,
      key: 'test'
    };
    const info = await sdk.account.getMetadata(metadataKey);
    assert.strictEqual(info.errorCode, 0, "获取账户metadata失败");
    console.log(info);
  });

  it('Get Transaction History', async() => {
    const info = await sdk.transaction.getInfo(txHash);
    assert.strictEqual(info.errorCode, 0, "获取交易历史失败");
    console.log(JSON.stringify(info));
    txBlockNum = info.result.transactions[0].ledger_seq;
  });


  it('Get the latest block number', async() => {
    const data = await sdk.block.getNumber();
    console.log(data);
  });

  it('Check local node block synchronization status', async() => {
    const data = await sdk.block.checkStatus();
    console.log(data);
  });

  it('Get transactions for a blockNumber', async() => {
    const data = await sdk.block.getTransactions(txBlockNum);
    console.log(data);
  });

  it('Get block information', async() => {
    const data = await sdk.block.getInfo('100');
    console.log(data);
  });

  it('Get the latest block information', async() => {
    const data = await sdk.block.getLatestInfo();
    console.log(data);
  });

  it('Get the validators in the specified blockNumber', async() => {
    const data = await sdk.block.getValidators(txBlockNum);
    console.log(data);
  });

  it('Get the latest validators', async() => {
    const data = await sdk.block.getLatestValidators();
    console.log(data);
  });

  it('Get block rewards and validator rewards in the specified blockNumber', async() => {
    const data = await sdk.block.getReward(txBlockNum);
    console.log(data);
  });

  it('Get block rewards and validator rewards in the latest blockNumber', async() => {
    const data = await sdk.block.getLatestReward();
    console.log(data);
  });

  it('Get fees in the specified blockNumber', async() => {
    const data = await sdk.block.getFees(txBlockNum);
    console.log(data);
  });

  it('Get fees in the latest blockNumber', async() => {
    const data = await sdk.block.getLatestFees();
    console.log(data);
  });


  it('Create Contract', async () => {
    const accountInfo = await sdk.account.getNonce(newAddress);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = sdk.operation.contractCreateOperation({
      sourceAddress: newAddress,
      initBalance: '0',
      payload:'\'use strict\';\n\n\n\n\nlet globalAttribute = {};\nconst globalAttributeKey = \'global_attribute\';\n\n\n\n\nfunction makeAllowanceKey(owner, spender){\n    return \'allow_\' + owner + \'_to_\' + spender;\n}\n\n\n\n\nfunction approve(spender, value){\n    Utils.assert(Utils.addressCheck(spender) === true, \'Arg-spender is not a valid address.\');\n    Utils.assert(Utils.stoI64Check(value) === true, \'Arg-value must be alphanumeric.\');\n    Utils.assert(Utils.int64Compare(value, \'0\') > 0, \'Arg-value of spender \' + spender + \' must be greater than 0.\');\n\n\n\n\n    let key = makeAllowanceKey(Chain.msg.sender, spender);\n    Chain.store(key, value);\n\n\n\n\n    Chain.tlog(\'approve\', Chain.msg.sender, spender, value);\n\n\n\n\n    return true;\n}\n\n\n\n\nfunction allowance(owner, spender){\n    Utils.assert(Utils.addressCheck(owner) === true, \'Arg-owner is not a valid address.\');\n    Utils.assert(Utils.addressCheck(spender) === true, \'Arg-spender is not a valid address.\');\n\n\n\n\n    let key = makeAllowanceKey(owner, spender);\n    let value = Chain.load(key);\n    Utils.assert(value !== false, \'Failed to get the allowance given to \' + spender + \' by \' + owner + \' from metadata.\');\n\n\n\n\n    return value;\n}\n\n\n\n\nfunction transfer(to, value){\n    Utils.assert(Utils.addressCheck(to) === true, \'Arg-to is not a valid address.\');\n    Utils.assert(Utils.stoI64Check(value) === true, \'Arg-value must be alphanumeric.\');\n    Utils.assert(Utils.int64Compare(value, \'0\') > 0, \'Arg-value must be greater than 0.\');\n    if(Chain.msg.sender === to) {\n        Chain.tlog(\'transfer\', Chain.msg.sender, to, value);  \n        return true;\n    }\n    \n    let senderValue = Chain.load(Chain.msg.sender);\n    Utils.assert(senderValue !== false, \'Failed to get the balance of \' + Chain.msg.sender + \' from metadata.\');\n    Utils.assert(Utils.int64Compare(senderValue, value) >= 0, \'Balance:\' + senderValue + \' of sender:\' + Chain.msg.sender + \' < transfer value:\' + value + \'.\');\n\n\n\n\n    let toValue = Chain.load(to);\n    toValue = (toValue === false) ? value : Utils.int64Add(toValue, value); \n    Chain.store(to, toValue);\n\n\n\n\n    senderValue = Utils.int64Sub(senderValue, value);\n    Chain.store(Chain.msg.sender, senderValue);\n\n\n\n\n    Chain.tlog(\'transfer\', Chain.msg.sender, to, value);\n\n\n\n\n    return true;\n}\n\n\n\n\nfunction transferFrom(from, to, value){\n    Utils.assert(Utils.addressCheck(from) === true, \'Arg-from is not a valid address.\');\n    Utils.assert(Utils.addressCheck(to) === true, \'Arg-to is not a valid address.\');\n    Utils.assert(Utils.stoI64Check(value) === true, \'Arg-value must be alphanumeric.\');\n    Utils.assert(Utils.int64Compare(value, \'0\') > 0, \'Arg-value must be greater than 0.\');\n    \n    if(from === to) {\n        Chain.tlog(\'transferFrom\', Chain.msg.sender, from, to, value);\n        return true;\n    }\n    \n    let fromValue = Chain.load(from);\n    Utils.assert(fromValue !== false, \'Failed to get the value, probably because \' + from + \' has no value.\');\n    Utils.assert(Utils.int64Compare(fromValue, value) >= 0, from + \' Balance:\' + fromValue + \' < transfer value:\' + value + \'.\');\n\n\n\n\n    let allowValue = allowance(from, Chain.msg.sender);\n    Utils.assert(Utils.int64Compare(allowValue, value) >= 0, \'Allowance value:\' + allowValue + \' < transfer value:\' + value + \' from \' + from + \' to \' + to  + \'.\');\n\n\n\n\n    let toValue = Chain.load(to);\n    toValue = (toValue === false) ? value : Utils.int64Add(toValue, value); \n    Chain.store(to, toValue);\n\n\n\n\n    fromValue = Utils.int64Sub(fromValue, value);\n    Chain.store(from, fromValue);\n\n\n\n\n    let allowKey = makeAllowanceKey(from, Chain.msg.sender);\n    allowValue   = Utils.int64Sub(allowValue, value);\n    Chain.store(allowKey, allowValue);\n\n\n\n\n    Chain.tlog(\'transferFrom\', Chain.msg.sender, from, to, value);\n\n\n\n\n    return true;\n}\n\n\n\n\nfunction balanceOf(address){\n    Utils.assert(Utils.addressCheck(address) === true, \'Arg-address is not a valid address.\');\n\n\n\n\n    let value = Chain.load(address);\n    Utils.assert(value !== false, \'Failed to get the balance of \' + address + \' from metadata.\');\n    return value;\n}\n\n\n\n\nfunction init(input_str){\n    let params = JSON.parse(input_str).params;\n\n\n\n\n    Utils.assert(Utils.stoI64Check(params.totalSupply) === true && params.totalSupply > 0 &&\n           typeof params.name === \'string\' && params.name.length > 0 &&\n           typeof params.symbol === \'string\' && params.symbol.length > 0 &&\n           typeof params.decimals === \'number\' && params.decimals >= 0, \n           \'Failed to check args\');\n       \n    globalAttribute.totalSupply = params.totalSupply;\n    globalAttribute.name = params.name;\n    globalAttribute.symbol = params.symbol;\n    globalAttribute.version = \'ATP20\';\n    globalAttribute.decimals = params.decimals;\n    \n    Chain.store(globalAttributeKey, JSON.stringify(globalAttribute));\n    Chain.store(Chain.msg.sender, globalAttribute.totalSupply);\n}\n\n\n\n\nfunction main(input_str){\n    let input = JSON.parse(input_str);\n\n\n\n\n    if(input.method === \'transfer\'){\n        transfer(input.params.to, input.params.value);\n    }\n    else if(input.method === \'transferFrom\'){\n        transferFrom(input.params.from, input.params.to, input.params.value);\n    }\n    else if(input.method === \'approve\'){\n        approve(input.params.spender, input.params.value);\n    }\n    else{\n        throw \'<Main interface passes an invalid operation type>\';\n    }\n}\n\n\n\n\nfunction query(input_str){\n    let result = {};\n    let input  = JSON.parse(input_str);\n\n\n\n\n    if(input.method === \'tokenInfo\'){\n        globalAttribute = JSON.parse(Chain.load(globalAttributeKey));\n        result.tokenInfo = globalAttribute;\n    }\n    else if(input.method === \'allowance\'){\n        result.allowance = allowance(input.params.owner, input.params.spender);\n    }\n    else if(input.method === \'balanceOf\'){\n        result.balance = balanceOf(input.params.address);\n    }\n    else{\n        throw \'<Query interface passes an invalid operation type>\';\n    }\n    return JSON.stringify(result);\n}\n',
      initInput: '{\"params\":{\"totalSupply\":\"100000000000000\",\"name\":\"CRV\",\"symbol\":\"CRV \",\"decimals\":6}}',
      metadata: 'create contract',
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: newAddress,
      gasPrice: '1000',
      feeLimit: '17000000',
      nonce,
      operations: [operationItem],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [newPriv],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Create Contract sleep', async () => {
    await sleep(1500);
  });

  it('Create Contract sleep', async () => {
    await sleep(1500);
  });


  it('Get Contract Address', async() => {
    const data = await sdk.contract.getAddress(txHash);
    assert.strictEqual(data.errorCode, 0, "获取合约地址失败");
    contractAddress = data.result.contractAddressList[0].contract_address;
    console.log(contractAddress);
  });

  it('Get Contract Info', async() => {
    const data = await sdk.contract.getInfo(contractAddress);
    assert.strictEqual(data.errorCode, 0, "获取合约信息失败");
    console.log(data.result);
  });

  it('Check Contract Valid', async() => {
    const data = await sdk.contract.checkValid(contractAddress);
    assert.strictEqual(data.errorCode, 0, "验证合约失败");
    assert.strictEqual(data.result.isValid, true, "验证合约失败");
    console.log(data.result);
  });

  it('Check Contract Valid', async() => {
    const data = await sdk.contract.checkValid(contractAddress);
    assert.strictEqual(data.errorCode, 0, "验证合约失败");
    assert.strictEqual(data.result.isValid, true, "验证合约失败");
    console.log(data.result);
  });

  it('Invoke Contract By Sending Asset', async () => {
    const accountInfo = await sdk.account.getNonce(newAddress);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = await sdk.operation.contractInvokeByAssetOperation({
      sourceAddress: newAddress,
      contractAddress: contractAddress,
      code: 'CRV',
      issuer: newAddress,
      assetAmount: '1',
      input: '{\"method\":\"transfer\",\"params\":{\"to\":\"ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3\",\"value\":\"10000000\"}}',
      metadata: 'invoke contract by sending asset'
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: newAddress,
      gasPrice: '1000',
      feeLimit: '1000000',
      nonce,
      operations: [operationItem],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [newPriv],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Invoke Contract By Sending Asset sleep', async () => {
    await sleep(1500);
  });

  it('Invoke Contract By Sending Asset sleep', async () => {
    await sleep(1500);
  });

  it('Invoke Contract By Sending Gas', async () => {
    const accountInfo = await sdk.account.getNonce(newAddress);
    assert.strictEqual(accountInfo.errorCode, 0, accountInfo.errorDesc);

    let nonce = accountInfo.result.nonce;
    // nonce + 1
    nonce = new BigNumber(nonce).plus(1).toString(10);

    // ====================================
    // 1. build operation (gasSendOperation)
    // ====================================
    const operationInfo = await sdk.operation.contractInvokeByGasOperation({
      sourceAddress: newAddress,
      contractAddress: contractAddress,
      amount: 0,
      input: '{\"method\":\"transfer\",\"params\":{\"to\":\"ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3\",\"value\":\"10000000\"}}',
      metadata: 'invoke contract by sending gas'
    });
    assert.strictEqual(operationInfo.errorCode, 0, operationInfo.errorDesc);

    const operationItem = operationInfo.result.operation;

    // ====================================
    // 2. build blob
    // ====================================
    const blobInfo = sdk.transaction.buildBlob({
      sourceAddress: newAddress,
      gasPrice: '1000',
      feeLimit: '1000000',
      nonce,
      operations: [operationItem],
    });
    assert.strictEqual(blobInfo.errorCode, 0, blobInfo.errorDesc);

    const blob = blobInfo.result.transactionBlob;

    // ====================================
    // 3. sign blob with sender private key
    // ====================================
    let signatureInfo = sdk.transaction.sign({
      privateKeys: [newPriv],
      blob,
    });
    assert.strictEqual(signatureInfo.errorCode, 0, signatureInfo.errorDesc);

    const signature = signatureInfo.result.signatures;

    // ====================================
    // 4. submit transaction
    // ====================================
    const transactionInfo = await sdk.transaction.submit({
      blob,
      signature: signature,
    });
    assert.strictEqual(transactionInfo.errorCode, 0, transactionInfo.errorDesc);

    txHash = transactionInfo.result.hash;

    console.log(txHash);

    await sleep(1500);
  });

  it('Invoke Contract By Sending Gas sleep', async () => {
    await sleep(1500);
  });

  it('Invoke Contract By Sending Gas sleep', async () => {
    await sleep(1500);
  });

  it('call Contract ', async () => {

    const callResp = await sdk.contract.call({
      contractAddress: contractAddress,
      contractBalance: '100000000000',
      feeLimit: '1000000000',
      gasPrice: '1000',
      input: '{\"method\":\"balanceOf\",\"params\":{\"address\":\"ZTX3Ta7d4GyAXD41H2kFCTd2eXhDesM83rvC3\"}}',
      optType: 2
    });
    assert.strictEqual(callResp.errorCode, 0, callResp.errorDesc);
    console.log(callResp.result);
  });

});
