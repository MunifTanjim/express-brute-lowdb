[![GitHub release](https://img.shields.io/github/release/MunifTanjim/express-brute-lowdb.svg?style=for-the-badge)](https://github.com/MunifTanjim/express-brute-lowdb/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/MunifTanjim/express-brute-lowdb.svg?style=for-the-badge)](https://github.com/MunifTanjim/express-brute-lowdb/releases)
[![license](https://img.shields.io/github/license/MunifTanjim/express-brute-lowdb.svg?style=for-the-badge)](https://github.com/MunifTanjim/express-brute-lowdb/blob/master/LICENSE)

# express-brute-lowdb

A [lowdb](https://github.com/typicode/lowdb) storage adapter for [express-brute](https://github.com/AdamPflug/express-brute) middleware

## Installation

via **npm**:

```shell
$ npm install express-brute-lowdb
```

via **yarn**:

```shell
$ yarn add express-brute-lowdb
```

## Usage

```js
const ExpressBrute = require('express-brute')
const LowdbStore = require('express-brute-lowdb');

const store = new LowdbStore();
const bruteforce = new ExpressBrute(store);

app.post('/auth',
  bruteforce.prevent,
  (req, res, next) => {
    res.send('Success!')
  }
);
```

## Options

Available options:

|  Name         |  Type      |  Description                          |  Required
| ------------- | ---------- |-------------------------------------- | ----------
| `prefix`      | `String`   | Prefix for each lowdb key             | _false_
| `adapter`     | `Function` | lowdb adapter Constructor             | _false_
| `adapterArgs` | `Array`    | Arguments for adapter Constructor     | _false_
| `rootKey`     | `String`   | name for database objects's root key  | _false_

Example:

```js
const Memory = require('lowdb/adapters/Memory') // or
const FileSync = require('lowdb/adapters/FileSync')

// defaults:
const options = {
  prefix: '',
  adapter: Memory, // only `Memory` & `FileSync` adapters are currently supported
  adapterArgs: ['express-brute.json'],
  rootKey: 'express-brute'
}

const store = new LowdbStore(options);
```

**N.B.**: lowdb's `Memory` adapter is not suitable for production usage

### Useful Links

- [lowdb Adapters API](https://github.com/typicode/lowdb#adapters-api)

## Changelog

[Changelog for express-brute-lowdb](https://github.com/MunifTanjim/express-brute-lowdb/blob/master/CHANGELOG.md)

## License

Licensed under the MIT License. Check the [LICENSE](https://github.com/MunifTanjim/express-brute-lowdb/blob/master/LICENSE) file for details.

