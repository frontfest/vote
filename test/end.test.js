const request = require('supertest')

const app = require('../app')
const db = require('../db')

describe('end route', () => {
  let response
  beforeEach(async () => {
    await db.sequelize.sync({ force: true })
  })
  it('end: code does not exist', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/end').send({ ticketId: 'random_code', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('No existe el localizador.')
  })
  it('end: already voted', async () => {
    await db.census.create({ code: 'abcde', voted: true })
    response = await request(app).post('/end').send({ ticketId: 'abcde', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Lo siento, ya has votado.')
  })
  it('end: voted ok', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/end').send({ ticketId: 'abcde', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('¡Gracias! Has votado por OPT1.')
    const vote = await db.votes.findOne({ where: { result: 'OPT1' } })
    expect(vote.result).toBe('OPT1')
    const individual = await db.census.findOne({ where: { code: 'abcde' } })
    expect(individual.voted).toBe(true)
  })
})
