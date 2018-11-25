import { Router } from 'express'
import sqlite from 'sqlite'

const router = Router()

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
    const db = await sqlite.open('./database.sqlite')
    const individual = await db.get('SELECT voted FROM Census WHERE id=?;', ticketId)
    if (individual) {
      if (individual.voted === 0) {
        error = false
      } else {
        error = 'Lo siento, ya has votado.'
      }
    } else {
      error = 'No existe el localizador.'
    }
    await sqlite.close()
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

export default router
