const express = require('express')
const database = require('../database.js')

const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { selectedOption, ticketId } = req.body
  let error
  try {
    const db = await database.connect()
    const individual = await database.getCensusIndividual(db, ticketId)
    const hasVoted = individual && individual.voted
    if (!hasVoted) {
      await database.insertVote(db, selectedOption)
      await database.updateCensusIndividual(db, ticketId)
    } else {
      error = 'Lo siento, ya has votado.'
    }
    await database.disconnect()
  } catch (e) {
    error = e
  }

  res.render('end', {
    title: 'FrontFest Vote',
    selectedOption,
    error
  })
})

module.exports = router
