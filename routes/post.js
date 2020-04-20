
const express = require('express')
const {getPosts, showPost, createPost, updatePost, destroyPost} = require('../controllers/post')
// const {createPostValidator } = require('../validator/auth')

const router = express.Router()

router.get('/posts',getPosts)
router.get('/post/:id', showPost)
router.post('/post', createPost)
router.put('/post/:id', updatePost )
router.delete('/post/:id', destroyPost )

module.exports = router;

 
