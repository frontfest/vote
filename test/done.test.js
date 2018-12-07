const request = require('supertest')

const app = require('../app')
const db = require('../db')

describe('done route', () => {
  let response
  beforeEach(async () => {
    await db.sequelize.sync({ force: true })
  })
  it('done: code does not exist', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/done').send({ ticketId: 'random_code', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('No existe el localizador.')
  })
  it('done: already voted', async () => {
    await db.census.create({ code: 'abcde', voted: true })
    response = await request(app).post('/done').send({ ticketId: 'abcde', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('Lo siento, ya has votado.')
  })
  it('done: voted ok', async () => {
    await db.census.create({ code: 'abcde' })
    response = await request(app).post('/done').send({ ticketId: 'abcde', selectedOption: 'OPT1' })
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('¡Gracias! Has votado por OPT1.')
    const vote = await db.votes.findOne({ where: { result: 'OPT1' } })
    expect(vote.result).toBe('OPT1')
    const individual = await db.census.findOne({ where: { code: 'abcde' } })
    expect(individual.voted).toBe(true)
  })
})
