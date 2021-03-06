const sequelize = require('./config/database')
const auth = require('./routes/auth')
const post = require('./routes/post')
const user = require('./routes/user')
sequelize.sync({ alter: true }).then(function () {
    console.log("Tables created")
})
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3000, function () {
    console.log('The server has started at port number 3000')
})
app.use('/api/auth', auth)
app.use('/api/posts', post)
app.use('/api/user', user)