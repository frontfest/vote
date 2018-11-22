import { Router } from 'express'
import sqlite from 'sqlite'

const router = Router()

router.get('/', function (req, res, next) {
  res.redirect('/')
})

router.post('/', async function (req, res, next) {
  const { selected, ticket } = req.body
  let error = false
  try {
    const db = await sqlite.open('./database.sqlite')
    const census = await db.get('SELECT voted FROM Census WHERE id=?', ticket)
    const hasVoted = census.voted
    if (!hasVoted) {
      await db.run('INSERT INTO Votes (result) VALUES (?)', selected)
      await db.run('UPDATE Census SET voted=1 WHERE id=?', ticket)
    } else {
      error = true
    }
    await db.close()
  } catch (e) {
    console.log(e)
  }

  res.render('end', {
    title: 'END',
    error,
    selected
  })
})

export default router
