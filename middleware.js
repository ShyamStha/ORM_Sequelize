const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = function (req, res, next) {
    const token = req.header('jwt')
    if (!token) {
        return res.status(401).json('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_ID)
        res.json(verified)
        next()
    }
    catch (err) {
        res.status(400).send('Invalid token')
    }
}
module.exports = auth