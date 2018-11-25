import { Router } from 'express'
import sqlite from 'sqlite'

const router = Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { selectedOption, ticketId } = req.body
  let error
  try {
    const db = await sqlite.open('./database.sqlite')
    const census = await db.get('SELECT voted FROM Census WHERE id=?', ticketId)
    const hasVoted = census && census.voted
    if (!hasVoted) {
      await db.run('INSERT INTO Votes (result) VALUES (?)', selectedOption)
      await db.run('UPDATE Census SET voted=1 WHERE id=?', ticketId)
    } else {
      error = 'Lo siento, ya has votado.'
    }
    await db.close()
  } catch (e) {
    error = e
  }

  res.render('end', {
    title: 'FrontFest Vote',
    selectedOption,
    error
  })
})

export default router
