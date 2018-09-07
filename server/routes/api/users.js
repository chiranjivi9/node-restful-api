const express = require('express');
const router = express.Router();
const Joi = require('joi')
// const userData = require('../../db.json');
const User = require('../../models/User');
const Investment = require('../../models/Investment')
const mongoose = require('mongoose');

// [GET]
// fetch all users from the database
router.get('/',(req, res, next)=>{
  User.find()
  // .exec()
  .then(docs => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json({
        message : "All Users.",
        Details : docs

      });
    } else {
      res.status(404).send("There are no users in the database currently.")
    }
  })
  .catch(err => {
    console.log(err);
    res.json(404).send(err);
  })
});


// get the posted data with id
router.get('/:userid', (req, res, next) => {
  const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(docs => {
    console.log("From database", docs);
    if(docs){
      res.status(200).json({
          message : "User.",
          Details : docs

      });
    }
    else{
      res.status(404).json({ message : "No valid entry for the entered ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
});


// [POST]
// create a user
  router.post('/',(req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = new User({
      fName: req.body.fName,
      lName: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      investments : [
        // {
        // campaignId : req.body.campaignId,
        // tradeId :  req.body.tradeId,
        // isPersonal : req.body.isPersonal,
        // amount : req.body.amount,
        // paymentMethod :  req.body.paymentMethod,
        // fee : req.body.fee
        // }
      ],
      comments : [
        // {
        //   role : req.body.role,
        //   comment : req.body.comment,
        //   // campaignId : req.body.campaignId,
        //   content : req.body.content
        // }
      ]
    })
    user.save(err => {
      if (err) return res.send(err.message)
      return res.status(200).send(user)
    })
  })

// [PUT]
// Update user
router.put('/:userid', (req,res)=>{
  User.findById(req.params.userid, (err, user)=>{
    if (err) return rest.status(404).send(err.message)
      const{error} = (req.body)
      if(error) return res.status(400).send(error.details[0].message)

      user.fName =(req.body.fName)
      user.lName = req.body.last_name
      user.email = req.body.email
      user.password = req.body.password

      user.investments = []
      user.investments = req.body.investmentData

      user.comments = []
      user.comments = req.body.commentData

      console.log(user);
    user.save(err=>{
      if(err) return res.send(err.message)
      res.status(200).send(user)
    })
  })
});


// [DELETE]
// Delete user with user id
router.delete('/:userid',(req, res) => {
  User.remove({_id: req.params.userid}, (err) => {
    if(err){
      res.status(404).send("User does not exist.")
    }
    else{
      res.status(200).send("User deleted successfully.")
  }
  })
});

// delete a specific investment with user id 
router.delete('/user/:userid/investment/:investmentid', (req, res) => {
router.delete('/user/:userid/investment/:investid',(req, res, next)=>{
  const id = req.params.userid;
  const iid = req.params.investid;
  User.update(
      {'_id': id},
      { $pull: { "investments" : { '_id': iid } } },
      (err)=>{
            if (err) {
              return next(err)
            }
            res.status(200).send("Investment Deleted Successfully!")
          });
});



function validateUser (data) {
  const schema = {
    fName: Joi.string().trim().min(2).regex(/^[a-zA-Z ]*$/).required(),
    lName: Joi.string().trim().min(2).regex(/^[a-zA-Z ]*$/).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9@#&]{6,30}$/).required()
    // campaignId : Joi.number(),
    // tradeId :  Joi.number(),
    // isPersonal : Joi.boolean(),
    // amount :  Joi.number(),
    // paymentMethod :  Joi.string().trim().min(3).regex(/^[a-zA-Z]*$/),
    // fee : Joi.number()
  }
  return Joi.validate(data, schema)
}

module.exports = router;
