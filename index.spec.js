const { describe, it } = require('node:test')

const Koa = require('koa')
const request = require('supertest')
const responseTime = require('.')

describe('Test koa response time', () => {
  it('should send X-Response-Time header', async () => {
    const server = createServer()

    await request(server.callback())
      .get('/')
      .expect('X-Response-Time', /^[0-9.]+ms$/)
  })

  describe('with `digits` option', () => {
    it('should default to 3', async () => {
      const server = createServer()

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{3}ms$/)
    })

    it('should allow custom digits', async () => {
      const server = createServer({ digits: 5 })

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{5}ms$/)
    })

    it('should allow no digits', async () => {
      const server = createServer({ digits: 0 })

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9]+ms$/)
    })
  })

  describe('with `headerName` option', () => {
    it('should default to X-Response-Time', async () => {
      const server = createServer()

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/)
    })

    it('should allow custom header name', async () => {
      const server = createServer({ headerName: 'X-Time-Taken' })

      await request(server.callback())
        .get('/')
        .expect('X-Time-Taken', /^[0-9.]+ms$/)
    })
  })

  describe('with `suffix` option', () => {
    it('should default to true', async () => {
      const server = createServer()

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/)
    })

    it('should allow disabling suffix', async () => {
      const server = createServer({ suffix: false })

      await request(server.callback())
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+$/)
    })
  })
})

function createServer (opts) {
  const app = new Koa()
  app.use(responseTime(opts))

  return app
}
