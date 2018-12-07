module.exports = (sequelize, DataTypes) =>
  sequelize.define('Votes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    result: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'votes'
  })
