require('dotenv').config()

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const db = require('./db')

const DATASET_FILE = process.argv[2]

if (DATASET_FILE) {
  const filePath = path.join(__dirname, DATASET_FILE)

  fs.readFile(filePath, { encoding: 'utf-8' }, function (readFileError, censusFile) {
    if (!readFileError) {
      const censusArray = censusFile.trim().split('\n')

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(
        `The tables will be dropped and created again with the new data (${censusArray.length} entries for the census). Proceed? (y/N) `,
        async function (answer) {
          if (answer === 'y') {
            try {
              await db.sequelize.sync({ force: true })
              await db.census.bulkCreate(censusArray.map(code => ({ code })))
              await db.sequelize.close()
              console.log('Data loaded correctly.')
            } catch (sqliteError) {
              console.error(sqliteError)
            }
          } else {
            console.log('Cancelled.')
          }
          rl.close()
        })
    } else {
      console.error(readFileError)
    }
  })
} else {
  console.error('Please provide a data file.')
}
