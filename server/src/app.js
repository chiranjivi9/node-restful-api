const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const mongoose = require('mongoose')

const db = require('../../config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

// JWT middleware
// app.use(
//   jwt({
//     secret: 'dummy'
//   }).unless({
//     path: [
//       '/api',
//       '/auth/login',
//       '/auth/register',
//       '/plaid/get_access_token',
//       '/plaid/auth'
//     ]
//   })
// )
const api = require('../routes/api')
const usersRoute = require('../routes/api/users');
const investmentRoute = require('../routes/api/investments');
const campaignRoute = require('../routes/api/campaigns');

app.use('/api', api)
// app.use('/', web)
app.use('/u', usersRoute);
app.use('/i', investmentRoute);
app.use('/c', campaignRoute)

module.exports = app
