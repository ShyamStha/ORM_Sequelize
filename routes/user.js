
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
//update user account here
router.put('/:id', userController.updateUser)
//delete a user
router.delete('/:id', userController.deleteUser)
//get all users data
router.get('/', userController.allUsers)
module.exports = router