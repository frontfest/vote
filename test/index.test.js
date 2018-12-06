const request = require('supertest')

const app = require('../app')

describe('index', () => {
  let response
  beforeEach(async () => {
    response = await request(app).get('/')
  })
  it('should response with a 200 OK status code', () => {
    expect(response.statusCode).toBe(200)
  })
  it('should render the proper text', () => {
    expect(response.text).toContain('Introduce tu localizador')
  })
})
