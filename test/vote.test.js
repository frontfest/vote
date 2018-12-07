const request = require('supertest')

const app = require('../app')
const db = require('../db')

describe('vote route', () => {
  let response
  beforeEach(async () => {
    await db.sequelize.sync({ force: true })
  })
  it('vote: code does not exist', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/vote').send({ ticketId: 'random_code' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('No existe el localizador.')
  })
  it('vote: already votedt', async () => {
    await db.census.create({ code: 'abcde', voted: true })
    response = await request(app).post('/vote').send({ ticketId: 'abcde' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Lo siento, ya has votado')
    const individual = await db.census.findOne({ where: { code: 'abcde' } })
    expect(individual.voted).toBe(true)
  })
  it('vote: continue ok', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/vote').send({ ticketId: 'abcde' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('abcde')
    const individual = await db.census.findOne({ where: { code: 'abcde' } })
    expect(individual.voted).toBe(false)
  })
})
