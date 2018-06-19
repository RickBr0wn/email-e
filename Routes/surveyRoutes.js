const requireLogin = require('../Middlewares/requireLogin')

module.exports = app => {
  app.post('/api/surveys', requireLogin, (req, res) => {
    
  })
}