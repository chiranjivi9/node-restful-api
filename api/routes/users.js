const express = require('express');
const router = express.Router();
const userData = require('../../db.json');
const User = require ('../models/userModel');
const mongoose = require('mongoose');

// GET METHOD
router.get('/', (req, res, next)=>{
  res.status(200).json({
    message: 'Handling GET requests to /products',
    message2: "You have accessed the Users data"
  });
});

// fetch all Users with this route
router.get('/users', (req, res, next)=>{
  const users = userData.users
  res.status(200).json(users)
});

// fetch user data with specific id
router.get('/user/:id', (req, res, next)=>{
  if(req.params.id < userData.users.length){
    const user = userData.users[req.params.id]
    res.status(200).json(user)
  }
  else{
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
  }
});

// fetch investments for specific user with ref to the id
router.get('/user/:id/investment/:investid',(req, res, next)=>{
  if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
    const investment = userData.users[req.params.id].investments[req.params.investid]
    res.status(200).json({investment})
  }
  else {
    res.status(404).json({
        message: "Entry not found"
    });
  }
});

// fetch all the investments
router.get('/investments',(req, res, next)=>{
  const userInvestments = userData.investments
  res.status(200).json({userInvestments})
});

// fetch investment by id
router.get('/investment/:id', (req,res,next)=>{

  if(req.params.id<userData.investments.length){

    const investment = userData.investments[req.params.id]
    res.status(200).json({ investment });
  }
  else{
    res.status(404).json({
      success : false,
      message: "Not Found"
    });
  }
});

// fetch users for specific investment with ref to the id
router.get('/investment/:investid/user/:id',(req, res, next)=>{

  if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
    const user = userData.users[req.params.id].investments[req.params.investid]
    res.status(200).json(user)
  }
  else {
    res.status(404).json({
        message: "Entry not found"
    });
  }
});

// POST METHOD
// saving to the database
router.post('/', (req, res, next)=>{
  const user = new User({
    user : req.body.user,
    email : req.body.email,
    _id : new mongoose.Types.ObjectId(),
      investments :[
        {
          amountInvested : req.body.amountInvested,
          companyName : req.body.companyName
        }
      ],
  });
  user.save().then(result=>{
    console.log(result);
    res.status(200).json({
      message: 'Handling POST requests to /products',
      User: result
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error : err
    });
});
// test call
//   res.json({
//
//       user: req.body.user,
//       email: req.body.email
// })
// res.send("hello REST")

});

// fetch all users from the database
router.get('/allusers',(req, res, next)=>{
  User
  .find()
  .exec()
  .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
        res.status(200).json(docs);
      }
    else{
      res.status(404).json({
        message : "There are no users in the database currently. Please add/create users to the database. "

      })
    }
  })
  .catch(err => {
      console.log(err);
      res.json(500).json({error: err});
    })
});

// get the posted data with id
router.get('/:userid', (req, res, next) => {
  const id = req.params.userid;
  User.findById(id)
  .exec()
  .then(doc=>{
      console.log("From database", doc);
      if(doc){
        res.status(200).json(doc);
       }
       else{
         res.status(404).json({ message : "No valid entry for the entered ID" });
       }
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json({error:err});
  });
});

router.patch('/:userid', (req,res, next)=>{
  const id = req.params.userid;
  const updateUser = {};
  for ( const ops of req.body){
    updateUser[ops.propName] = ops.value;
  }
User.update({ _id: id },{ $set : updateUser })
.exec()
.then(result => {
  console.log(result)
  res.status(200).json(result);
})
.catct(err => {
  console.log(err)
  res.status(500).json({
    error : err
  });

})
});


router.delete('/:userid',(req, res, next)=>{
  const id = req.params.userid
  User.remove({_id : id})
  .exec()
  .then(result =>{
    res.status(200).json({message : "Entry Deleted Successfully."})
  .catch(err =>{
    res.status(500).json({
      error : err,
      message : "ID entered does not exists."
      });
    })
  })
  // res.status(200).json({
  //   message:"User Deleted"
  //   });
});


module.exports = router;
