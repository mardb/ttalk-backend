const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
require('dotenv').config()



const app = express()
const PORT = process.env.PORT || 4000

//routs
const authRoutes = require('./routes/auth')
//morgan first  
app.use(morgan('dev'))
app.use(bodyParser.json());


//middleware
app.use('/api/v1', authRoutes)
app.use(cors()); //allows all origins


// if(process.env.NODE_ENV = 'localhost:3000') //change later
if(process.env.NODE_ENV = 'development') //change later to localhost
  app.use(cors({origin:`http://localhost:3000`}))
 
// app.get('/', (req, res) => {
//   res.send('api page');
// })

app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`))