const User = require('../models/User')
const bcrypt = require('bcrypt')
const updateUser = async function (req, res) {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            const user = await User.findOne({ where: { id: req.params.id } })
            if (user) {
                const updatedUser = await user.update(req.body)
                res.status(200).json('Account has been updated')
            }
        }
        catch (err) {
            res.send(500).json(err)
        }
    }
    else {
        return res.status(401).json('You can only updated your account')
    }
}
const deleteUser = async function (req, res) {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findOne({ where: { id: req.params.id } })
            if (user) {
                const deletedUser = await user.destroy(req.body)
                res.status(200).json('Account has been deleted')
            }
        }
        catch (err) {
            res.send(500).json(err)
        }
    }
    else {
        return res.status(401).json('You can only delete your account')
    }
}
const allUsers = async function (req, res) {
    try {
        const allUsers = await User.findAll()
        res.status(200).json(allUsers)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    allUsers
}