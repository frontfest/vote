const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { ticketId } = req.body
  let error

  const options = [
    { value: 'OPT1', name: 'Opción 1' },
    { value: 'OPT2', name: 'Opción 2' },
    { value: 'OPT3', name: 'Opción 3' },
    { value: 'OPT4', name: 'Opción 4' }
  ]

  try {
    const individual = await db.census.findOne({ where: { code: ticketId } })
    if (individual) {
      if (!individual.voted) {
        error = false
      } else {
        error = 'Lo siento, ya has votado.'
      }
    } else {
      error = 'No existe el localizador.'
    }
  } catch (e) {
    error = e
  }

  res.render('vote', {
    title: 'FrontFest Vote',
    options,
    ticketId,
    error
  })
})

module.exports = router
