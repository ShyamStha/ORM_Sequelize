const express = require('express')
const router = express.Router()
const auth = require('../middleware')
const postController = require('../controller/postController')
router.post('/', auth, postController.posts)
module.exports = router