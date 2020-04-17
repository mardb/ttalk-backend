
const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const {createPostValidator } = require('../validator/auth')
// const {requireSignin} = require('../controllers/auth')


const router = express.Router()

router.get('/posts',getPosts)
router.post('/post',  createPostValidator , createPost)
//with validation
// router.post('/post', requireSignin, createPostValidator , createPost)

module.exports = router;

 
