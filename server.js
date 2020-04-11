const express = require('express');
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT || 4000


app.get('/api/v1/signup', (req, res) => {
  res.json({
      data: 'this is the signup page'
  })
})


app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`))