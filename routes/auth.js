const express = require('express')
const router = express.Router()


router.get('/api/v1/signup', (req, res) => {
  res.json({
      data: 'this is the signup page'
  })
})

module.exports = router 