const express = require('express');
// const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000

//routs
const authRoutes = require('./routes/auth')

//middleware
app.use('/api/v1', authRoutes)

// app.get('/', (req, res) => {
//   res.send('api page');
// })

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`))