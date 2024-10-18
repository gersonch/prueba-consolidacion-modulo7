const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle
  }
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./user.model.js')(sequelize, Sequelize)
db.bootcamps = require('./bootcamp.model.js')(sequelize, Sequelize)

db.users.belongsToMany(db.bootcamps, {
  through: 'user_bootcamp',
  as: 'bootcamps',
  foreignKey: 'user_id'
})
db.bootcamps.belongsToMany(db.users, {
  through: 'user_bootcamp',
  as: 'users',
  foreignKey: 'bootcamps_id'
})

module.exports = db
