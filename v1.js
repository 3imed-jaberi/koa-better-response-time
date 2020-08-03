/*!
 * koa-better-response-time
 * Copyright(c) 2020 Imed Jaberi
 * MIT Licensed
 */

'use strict'

/**
 * Expose `xResponseTime()` for Koa@1.x.x.
 */

module.exports = xResponseTime

/**
 * Create a middleware to add a `X-Response-Time` header displaying
 * the response duration in milliseconds.
 *
 * @param {Object} [options]
 * @param {Number} [options.digits=3]
 * @param {String} [options.headerName=X-Response-Time]
 * @param {Boolean} [options.suffix=true]
 *
 * @api public
 */

function xResponseTime (options) {
  options = options || {}

  // response time digits
  options.digits = options.digits === 0 ? 0 : options.digits || 3
  // header name
  options.headerName = options.headerName || 'X-Response-Time'
  // display suffix
  options.suffix = options.suffix === undefined || !!options.suffix

  return function * (next) {
    const startAt = process.hrtime()
    yield next
    const [seconds, nanoseconds] = process.hrtime(startAt)
    let time = (seconds * 1e3 + nanoseconds / 1e6).toFixed(options.digits)
    if (options.suffix) time = `${time}ms`
    console.log(time)
    this.set(options.headerName, time)
  }
}
