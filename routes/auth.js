const express = require('express')
const router = express.Router()


const {signup} = require('../controllers/auth')


router.get('/signup', signup)
router.post('/signup', signup)

module.exports = router 