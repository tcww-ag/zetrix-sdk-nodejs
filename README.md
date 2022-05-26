zetrix-sdk-nodejs
=======

Let developers can all use zetrix blockchain services more easily.


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 6.0.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install zetrix-sdk-nodejs --save
```


## Quick Start

  Create zetrix-sdk-nodejs instance:

```js
'use strict';

const ZtxChainSDK = require('zetrix-sdk-nodejs');

const sdk = new ZtxChainSDK({
  host: 'https://192.168.10.100:19343',
});

```

  Usage:

```js
// Create account
sdk.account.create().then(data => {
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

```


## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Docs

  * [Documentation](https://docs.zetrix.com/en/sdk/node.js)

## License

  [MIT](LICENSE)
