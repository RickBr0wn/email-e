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

if(process.env.NODE_ENV === 'production') {
  // Express will serve up production assests
  // like the main.js file, or main.css file!
  app.use(express.static('client/build'))

  // Express will serve up the index.html file
  // if it doesn't recognise the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

// Web Server connection
const PORT = process.env.PORT || 5000
app.listen(PORT)