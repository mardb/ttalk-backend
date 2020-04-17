
const express = require('express')
const postController = require('../controllers/post')
const validators = require('../validators/index')

const router = express.Router()

router.get('/posts', postController.getPosts)
router.post('/post', postController.createPost)

module.exports = router;
