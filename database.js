const sqlite = require('sqlite')

module.exports = {
  connect: () => {
    return sqlite.open('./database.sqlite')
  },
  getCensusIndividual: (db, ticketId) => {
    return db.get('SELECT voted FROM Census WHERE id=?;', ticketId)
  },
  updateCensusIndividual: (db, ticketId) => {
    return db.run('UPDATE Census SET voted=1 WHERE id=?', ticketId)
  },
  insertVote: (db, selectedOption) => {
    return db.run('INSERT INTO Votes (result) VALUES (?)', selectedOption)
  },
  disconnect: () => {
    return sqlite.close()
  }
}
