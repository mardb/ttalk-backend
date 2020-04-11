const express = require('express')
const router = express.Router()


const {signup} = require('../controllers/auth')

//validators
const {userSignupValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')


router.get('/signup', userSignupValidator, runValidation, signup)
router.post('/signup', signup)

module.exports = router 