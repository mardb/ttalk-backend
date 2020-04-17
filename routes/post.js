
const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const {createPostValidator } = require('../validator/auth')

const router = express.Router()

router.get('/posts',getPosts)
router.post('/post', createPostValidator , createPost)

module.exports = router;

 
