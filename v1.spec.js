const Koa = require('koa-v1')
const request = require('supertest')
const responseTime = require('./v1')

describe('Test koa@1.x.x response time', () => {
  it('should send X-Response-Time header', (done) => {
    const server = createServer()

    request(server.callback())
      .get('/')
      .expect('X-Response-Time', /^[0-9.]+ms$/, done)
  })

  describe('with `digits` option', () => {
    it('should default to 3', (done) => {
      const server = createServer()

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{3}ms$/, done)
    })

    it('should allow custom digits', (done) => {
      const server = createServer({ digits: 5 })

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{5}ms$/, done)
    })

    it('should allow no digits', (done) => {
      const server = createServer({ digits: 0 })

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+ms$/, done)
    })
  })

  describe('with `headerName` option', () => {
    it('should default to X-Response-Time', (done) => {
      const server = createServer()

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/, done)
    })

    it('should allow custom header name', (done) => {
      const server = createServer({ headerName: 'X-Time-Taken' })

      request(server.callback())
        .get('/')
        .expect('X-Time-Taken', /^[0-9.]+ms$/, done)
    })
  })

  describe('with `suffix` option', () => {
    it('should default to true', (done) => {
      const server = createServer()

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/, done)
    })

    it('should allow disabling suffix', (done) => {
      const server = createServer({ suffix: false })

      request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+$/, done)
    })
  })
})

function createServer (opts) {
  const app = new Koa()
  app.use(responseTime(opts))

  return app
}
