import fs from 'fs'
import path from 'path'
import sqlite from 'sqlite'
import readline from 'readline'

const DB_FILE = 'database.sqlite'
const DATA_FILE = process.argv[2]

if (DATA_FILE) {
  const filePath = path.join(__dirname, DATA_FILE)

  fs.readFile(filePath, { encoding: 'utf-8' }, function (readFileError, censusData) {
    if (!readFileError) {
      const arrayCensusData = censusData.trim().split('\n')
      const processedCensusData = arrayCensusData.map(c => `('${c}')`).join(',')

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(`The Census table will be dropped and created again with the new data (${arrayCensusData.length} entries). Proceed? (y/N) `, async function (answer) {
        if (answer === 'y') {
          try {
            const db = await sqlite.open(DB_FILE)
            await db.get('DROP TABLE IF EXISTS "Votes"')
            await db.run('DROP TABLE IF EXISTS "Census"')
            await db.run('CREATE TABLE "Votes" ("id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, "result" TEXT);')
            await db.run('CREATE TABLE "Census" ("id" TEXT NOT NULL UNIQUE, "voted" INTEGER NOT NULL DEFAULT 0, PRIMARY KEY("id"));')
            await db.run(`INSERT INTO "Census" ("id") VALUES ${processedCensusData};`)
            await db.close()
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
