const Joi = require('joi')
const router = require('express').Router()
const User = require('../../models/User')

router.route('/users')
  // [GET] List all users
  .get((req, res) => {
    User.find((err, users) => {
      if (err) return res.status(404).send('There are no users in the database')
      if (users) return res.status(200).send(users)
    })
  })
  // [POST] Create a new user
  .post((req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      investments: []
    })
    user.save(err => {
      if (err) return res.send(err.message)
      return res.status(200).send(user)
    })
  })

router.route('/user/:id')
  // [GET] Access a user, based on ID
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(404).send(err.message)
      return res.status(200).send(user)
    })
  })
  // [PUT] Update a user, based on ID
  .put((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(404).send(err.message)

      const { error } = validateUser(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      user.first_name = req.body.first_name
      user.last_name = req.body.last_name
      user.email = req.body.email
      user.password = req.body.password

      user.save(err => {
        if (err) return res.send(err.message)
        res.status(200).send(user)
      })
    })
  })
  // [DELETE] Remove a user, based on ID
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
      if (err) return res.status(404).send(err.message)
      return res.status(200).send('User deleted successfully!')
    })
  })

function validateUser (data) {
  const schema = {
    first_name: Joi.string().trim().min(2).regex(/^[a-zA-Z0-9 ]*$/).required(),
    last_name: Joi.string().trim().min(2).regex(/^[a-zA-Z0-9 ]*$/).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
  }

  return Joi.validate(data, schema)
}

module.exports = router
