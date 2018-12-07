const request = require('supertest')

const app = require('../app')

describe('index route', () => {
  let response
  it('index: should render the proper text', async () => {
    response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Introduce tu localizador')
  })
})
