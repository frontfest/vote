const express = require('express')
const db = require('../db')

const router = express.Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  const censusVotedCount = await db.census.count({ where: { voted: true } })
  const censusAllCount = await db.census.count()
  const censusParticipationPercent = ((censusVotedCount / censusAllCount) * 100).toFixed(2)

  const votesAllCount = await db.votes.count()
  const votesAll = await db.votes.findAll()
  const votesAllResults = votesAll.map(vote => vote.result)

  const countedVotesObject = votesAllResults.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++
    } else {
      acc[curr] = 1
    }
    return acc
  }, {})

  const countedVotes = Object.keys(countedVotesObject).map(option => ({
    name: option,
    value: countedVotesObject[option],
    percent: ((countedVotesObject[option] / votesAllCount) * 100).toFixed(2)
  }))

  res.render('results', {
    censusParticipationPercent,
    countedVotes
  })
})

module.exports = router
