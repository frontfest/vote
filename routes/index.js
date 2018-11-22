import { Router } from 'express'
import sqlite from 'sqlite'

const router = Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = await sqlite.open('./database.sqlite')
    await db.run('CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, result TEXT)')
    await db.close()
  } catch (e) {
    console.log(e)
  }

  res.render('index', { title: 'Express' })
})

export default router
