
const express = require('express')
const {getPosts, createPost, updatePost, deletePost} = require('../controllers/post')
// const {createPostValidator } = require('../validator/auth')

const router = express.Router()

router.get('/posts',getPosts)
router.post('/post', createPost)
router.put('/post/:id', updatePost )
router.delete('/post/:id', deletePost )

module.exports = router;

 
