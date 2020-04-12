const express = require('express')
const router = express.Router()


const {
  signup, 
  accountActivation, 
  signin 
} = require('../controllers/auth')

//validators
const {userSignupValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')
const {userSigninValidator} = require('../validators/auth')


// router.get('/signup', userSignupValidator, runValidation, signup)
router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/account-activation', accountActivation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
// router.post('/signup', signup)

module.exports = router 