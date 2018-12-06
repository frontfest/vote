const request = require('supertest')

const app = require('../app')

describe('ticket does not exist', () => {
  let response
  beforeEach(async () => {
    response = await request(app).post('/vote').send({ ticketId: 'ticketId' })
  })
  it('should response with a 200 OK status code', () => {
    expect(response.statusCode).toBe(200)
  })
  it('should render the proper text', () => {
    expect(response.text).toContain('No existe el localizador.')
  })
})

describe('ticket exists', () => {
  let response
  beforeEach(async () => {
    response = await request(app).post('/vote').send({ ticketId: 'cUfL-2-P2b8' })
  })
  it('should response with a 200 OK status code', () => {
    expect(response.statusCode).toBe(200)
  })
  it('should render the proper text', () => {
    expect(response.text).toContain('Lo siento')
  })
})
