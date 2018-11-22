import { Router } from 'express'
import sqlite from 'sqlite'

const router = Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { ticket } = req.body
  let error
  let result
  let more = false

  try {
    const db = await sqlite.open('./database.sqlite')
    const voted = await db.get('SELECT voted FROM Census WHERE id=?;', ticket)
    if (voted) {
      if (voted.voted === 0) {
        result = 'Puedes votar'
        more = true
      } else {
        result = 'Ya has votado'
      }
    } else {
      result = 'No existe el usuario'
    }
    await sqlite.close()
  } catch (e) {
    error = e
  }

  res.render('vote', {
    ticket,
    result,
    more,
    error,
    title: 'voto'
  })
})

export default router
