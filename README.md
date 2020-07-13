# koa-better-response-time
---

[![Build Status][travis-img]][travis-url]
[![Coverage Status][coverage-img]][coverage-url]
[![NPM version][npm-badge]][npm-url]
[![License][license-badge]][license-url]
![Code Size][code-size-badge]

<!-- ***************** -->

[travis-img]: https://travis-ci.org/3imed-jaberi/koa-better-response-time.svg?branch=master
[travis-url]: https://travis-ci.org/3imed-jaberi/koa-better-response-time
[coverage-img]: https://coveralls.io/repos/github/3imed-jaberi/koa-better-response-time/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/3imed-jaberi/koa-better-response-time?branch=master
[npm-badge]: https://img.shields.io/npm/v/koa-better-response-time.svg?style=flat
[npm-url]: https://www.npmjs.com/package/koa-better-response-time
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/3imed-jaberi/koa-better-response-time/blob/master/LICENSE
[code-size-badge]: https://img.shields.io/github/languages/code-size/3imed-jaberi/koa-better-response-time

<!-- ***************** -->

Response time for Koa.js. Inspired from `response-time` with same object options.

> The "response time" is defined here as the elapsed time from when a request 
> enters this middleware to when the headers are written out to the client.


## `Installation`

```bash
# npm ..
$ npm install koa-better-response-time
# yarn ..
$ yarn add koa-better-response-time
```


## `Usage`

This is a practical example of how to use.

```javascript
const Koa = require('koa');
const xResponseTime = require('koa-better-response-time');
const app = new Koa();

// You can pass options object to xResponseTime.
app.use(xResponseTime());
```

### `OPTIONS`

You can pass an object that contains these keys to the **xResponseTime** middleware:

  - `digits` &mdash; (Number) The fixed number of digits to include in the output. `default to 3` (ex: `2.300ms`).
  - `headerName` &mdash; (String) Header name to use. `default to 'X-Response-Time'`
  - `suffix` &mdash; (Boolean) Display 'ms' beside the time. `default to  true` (ex: `2.300ms` vs `2.300`).


## `Note`

Best to `.use()` at the top before any other middleware, to wrap all subsequent middleware.


#### License
---

[MIT](LICENSE) &copy;	[Imed Jaberi](https://github.com/3imed-jaberi)
