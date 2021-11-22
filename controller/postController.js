const Post = require('../models/Post')
const posts = async function (req, res) {
    try {
        const post = await Post.create({
            title: req.body.title,
            description: req.body.description
        })
        return res.status(201).json(post)

    }
    catch (err) {
        res.status(400).json(err)
    }
}
module.exports = {
    posts
}