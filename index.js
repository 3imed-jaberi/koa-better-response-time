/*!
 * koa-better-response-time
 * Copyright(c) 2020-2022 Imed Jaberi
 * MIT Licensed
 */
'use strict'

/**
 * Expose `xResponseTime()`.
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

  return async function (ctx, next) {
    const startAt = process.hrtime()
    await next()
    const [seconds, nanoseconds] = process.hrtime(startAt)
    let time = (seconds * 1e3 + nanoseconds / 1e6).toFixed(options.digits)
    if (options.suffix) time = `${time}ms`

    ctx.set(options.headerName, time)
  }
}
