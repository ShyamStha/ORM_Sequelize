const { Sequelize } = require('sequelize')
require('dotenv').config()
const db = new Sequelize('sththapa', 'postgres', process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})
module.exports = db