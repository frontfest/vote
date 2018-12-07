const Sequelize = require('sequelize')

const DB_FILE = 'database.sqlite'

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: DB_FILE, // SQLite only
  operatorsAliases: false
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.census = require('./models/census')(sequelize, Sequelize)
db.votes = require('./models/votes')(sequelize, Sequelize)

// db.sync()

module.exports = db
