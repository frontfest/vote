const Sequelize = require('sequelize')

let sequelize

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
      ssl: true
    }
  })
} else if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.test.sqlite',
    operatorsAliases: false
  })
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.development.sqlite',
    operatorsAliases: false
  })
}

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.census = require('./models/census')(sequelize, Sequelize)
db.votes = require('./models/votes')(sequelize, Sequelize)

// db.sync()

module.exports = db
