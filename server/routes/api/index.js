const routes = require('express').Router()
const users = require('./users')
const example = require('./example')

routes.get('/', (req, res) => {

  return res.status(200).send('Welcome to Wunderfund\'s REST API v1!')
})

// Test route you can use to see how the API call works -
// it retrieves data, sends a response based on the category type
routes.use('/example', example)
routes.use('/', users)

module.exports = routes
