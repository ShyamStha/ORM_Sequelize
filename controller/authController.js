//authentication
const User = require('../models/User')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
})
const register = async function (req, res) {
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json(error.details[0].message)
    }

    try {
        const userExists = await User.findOne({ where: { email: req.body.email } })
        if (userExists) {
            res.status(400).json('This email has been already benn registered')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // const newUser = await user.save()
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }

}
const login = async function (req, res) {
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json(error.details[0].message)
    }
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            res.status(400).json('This email has not been registered, please register first')
        }
        matchPassword = await bcrypt.compare(req.body.password, user.password)
        if (!matchPassword) {
            res.status(400).json('Invalid Password')
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_ID)
        res.header('jwt', token).json(token)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {
    register,
    login
}