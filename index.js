const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')

require('./Models/User')
require('./Services/passport')

// Mongoose connection inc. error handling
mongoose.connect(keys.mongoURI)
  .then(() => console.log('connected to mongo')) 
  .catch(error => console.error('App starting error: ', error.stack)) 

// Global variables
const app = express()
const thirtyDays = 30*24*60*60*1000

// Middleware
app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: thirtyDays,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())

app.use(passport.session())

require('./Routes/authRoutes')(app)
require('./Routes/billingRoutes')(app)

// Web Server connection
const PORT = process.env.PORT || 5000
app.listen(PORT)