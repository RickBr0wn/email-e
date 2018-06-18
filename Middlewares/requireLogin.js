module.exports = (req, res, next) => {
  if(!req.user) {
    return status(401).send({ error: 'You must log!' })
  }

  next()
}