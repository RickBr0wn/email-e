const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')

require('./Models/User')
require('./Services/passport')

mongoose.connect(keys.mongoURI)
  .then(() => console.log('connected to mongo')) 
  .catch(error => console.error('App starting error:', error.stack)) 

const app = express()

require('./Routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)