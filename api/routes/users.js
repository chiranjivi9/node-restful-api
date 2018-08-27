const express = require('express');
const router = express.Router();
// const userData = require('../../db.json');
const User = require ('../models/userModel');
const Investment = require('../models/userInvestmentModel')
const mongoose = require('mongoose');


// [GET]

// fetch all users from the database
router.get('/users',(req, res, next)=>{
  User.find()
  // .exec()
  .then(docs => {
    console.log(docs);
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).send("There are no users in the database currently. Please add/create users to the database.")
    }
  })
  .catch(err => {
    console.log(err);
    res.json(500).send(err);
  })
});

// get the posted data with id
router.get('/user/:userid', (req, res, next) => {
  const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(doc => {
    console.log("From database", doc);
    if(doc){
      res.status(200).json(doc);
    }
    else{
      res.status(404).json({ message : "No valid entry for the entered ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});


// get all the investments data for the user
router.get('/user/:userid/investments',(req, res, next)=>{
  const uid = req.params.userid;
  User.findById(uid)
  .select('investments')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({error:err})
  })
});
//


// TODO: get one investment of a user  // done!
// router.get('/user/:userid/investment/:investmentId',(req, res) => {});
router.get('/user/:userid/investment/:investid',(req, res, next)=>{
  const uid = req.params.userid;
  // const iid = User.investments;
  User.find( { _id: req.params.userid}, { investments: { $elemMatch: { _id: req.params.investid} } })
  .then(docs =>{
    console.log(docs);
    res.status(200).json(docs)
  })
.catch(err=>{
  console.log(err);
  res.status(500).json({error:err});
})
});


// [POST]

// create a user
router.post('/users', (req, res) => {
  const user = new User({
    _id : mongoose.Types.ObjectId(),
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password,
  });
  user.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Created a new user!',
      details: result
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error : err
    });
  });
});

// create an investment by user id
router.post('/user/:userid/add',(req, res, next) => {
  User.findById(req.params.userid, (err, user) => {
    if (err) console.log(err)
    const new_investment = new Investment({

      tradeID: req.body.tradeid,
      _investmnetID : new mongoose.Types.ObjectId(),
      // isPersonal: req.body.ispersonal,
      paymentMethod: req.body.paymentmethod,
      amount: req.body.amount,
      campaign_id: req.body.campaign_id,
      fee: req.body.fee
    })
    user.investments.push(new_investment)  //push into the investments array

    user.save((err, updatedInvestments) => {
        if (err) return next(err)
        res.send(updatedInvestments)
    })
  })
});


// [PUT]
// Update user
router.put('/user/:userid', (req,res)=>{
  const id = req.params.userid
  User.findByIdAndUpdate(id, req.body, (err, user) =>{
    if(err) return next(err)
    res.json(user)
  })
});


// TODO: update an investment // done!
// router.put('/user/:userid/investment/:investmentid', (req, res) => {})
router.post('/user/:userid/investment/:investid',(req, res, next)=>{
  const id = req.params.userid;
  const iid = req.params.investid;
  User.update({'investments._id': iid},{'$set':{
    'investments.$.tradeID':req.body.tradeid,
    'investments.$.paymentMethod' : req.body.paymentmethod,
    'investments.$.campaign_id' : req.body.campaign_id,
    'investments.$.amount' : req.body.amount,
    'investments.$.fee' : req.body.fee
  }},(err)=>{
        if (err) {
          return next(err)
        }
        res.status(200).send("Investment Updated!")
      });
});


// update a user
router.patch('/user/:userid', (req,res) => {
  const id = req.params.userid;
  const updateUser = {};
  for (const ops of req.body) {
    updateUser[ops.propName] = ops.value;
  }
  User
    .update({ _id: id }, { $set: updateUser })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
});


// [DELETE]

router.delete('/user/:userid',(req, res) => {
  User.remove({_id: req.params.userid}, (err) => {
    if (err) res.status(500).send("User does not exist.")
    res.status(200).send("User deleted successfully.")
  })
});

// TODO: delete an investment // done!
// router.delete('/user/:userid/investment/:investmentid', (req, res) => {
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

module.exports = router;
