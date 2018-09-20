const express = require('express');
const router = express.Router();
const Joi = require('joi')
const User = require('../../models/User');
const Investment = require('../../models/Investment')
const mongoose = require('mongoose');

// [GET]
// get all users
router.get('/',(req, res, next)=>{
  User.find()
  .then(docs => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json({
        message: "All Users",
        Details: docs
      });
    }
    else {
      res.status(404).send("There are no users in the database currently.")
    }
  })
  .catch(err => {
    console.log(err);
    res.json(404).send(err);
  })
});

//get user under a specific id
router.get('/:userid', (req, res, next) => {
  const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(docs => {
    console.log("From database", docs);
    if(docs){
      res.status(200).json({
        message: "User Accessed!",
        Details: docs
      });
    }
    else{
      res.status(404).json({ message: "No valid entry for the entered ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(404).send({
      message: "No valid entry for the entered ID"
    });
  });
});

// [POST]
router.post('/:userid',(req,res,next)=>{
  res.status(404).send({
    message: "User already exists."
  })
})

// create a user
router.post('/',(req, res) => {
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const user = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  })
  user.save(err => {
    if (err) return res.send(err.message)
    return res.status(200).send({
      message: "User created successfully!",
      Details: user
    })
  })
});

// [PUT]
// Update/Modify user
router.put('/:userid', (req,res)=>{
  User.findById(req.params.userid, (err, user)=>{
    if (err) return rest.status(404).send({
      message: "User not found"
    })
    const{error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
      user.fName = req.body.fName
      user.lName = req.body.lName
      user.email = req.body.email
      user.password = req.body.password
      user.investments = []
      user.investments = req.body.investments
      user.comments = []
      user.comments = req.body.comments
    console.log(user);
    user.save(err=>{
    if(err) return res.send({
      message: "User not found"
    })
      res.status(200).send({
        message: "User updated successfully!",
        details: user
      })
    })
  })
  User.populate('comments', 'investments')
  // User.exec()
});

// [DELETE]
router.delete('/',(req, res,next)=>{
  res.status(404).json({
    message: "Please enter an ID."
  })
})

// Delete user with user id
router.delete('/:userid',(req, res) => {
  User.remove({_id: req.params.userid}, (err) => {
    if(err){
      res.status(404).send("User not found.")
    }
    else{
      res.status(200).send("User deleted successfully.")
    }
  })
});

// fn - Validate User input
function validateUser(data) {
  const schema = {
    fName: Joi.string().trim().min(2).regex(/^[a-zA-Z ]*$/).required(),
    lName: Joi.string().trim().min(2).regex(/^[a-zA-Z ]*$/).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9@#&]{6,30}$/).required(),
    investments: Joi.array().items(),
    comments: Joi.array().items(),
  }
  return Joi.validate(data, schema)
}

module.exports = router;
