const Sequelize = require('sequelize')
const db = require('../config/database')
const Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

})
module.exports = Post