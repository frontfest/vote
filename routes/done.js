const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { selectedOption, ticketId } = req.body
  let error
  try {
    const individual = await db.census.findOne({ where: { code: ticketId } })
    if (individual) {
      if (!individual.voted) {
        await db.votes.create({ result: selectedOption })
        await db.census.update({ voted: true }, { where: { code: ticketId } })
      } else {
        error = 'Lo siento, ya has votado.'
      }
    } else {
      error = 'No existe el localizador.'
    }
  } catch (e) {
    error = e
  }

  res.render('done', {
    selectedOption,
    error
  })
})

module.exports = router
