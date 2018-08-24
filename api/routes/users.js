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
// TODO: get one investment of a user
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

// TODO: update an investment
// router.put('/user/:userid/investment/:investmentid', (req, res) => {})

router.put('/user/:userid/investment/:investid/',(req, res, next)=>{
const iid = req.params.investid;
const id = req.params.userid;

// User.find( { _id: req.params.userid}, { investments: { $elemMatch: { _id: req.params.investid} } })
User.update({'investments._id': iid}, {'$set': {
    'investments.$.tradeID': req.body,
    'investments.$.paymentMethod' : req.body,
    'investments.$.amount' : req.body,
    'investments.$.fee' : req.body,
    'investments.$.campaign_id' : req.body

}}, function(err) {
  if(err){
          console.log(err);
          return res.send(err);
        }
        return res.json(model);
 });


// User.update({'investments._id': req.params.investid},
//      {'$set': {
//             // 'investments.$.post': "this is Update comment",
//             'investments.$.tradeID' : req.body,
//             // 'investments.$.paymentMethod' : req.body,
//             // 'investments.$.amount' : req.body,
//             // 'investments.$.fee' : req.body,
//             // 'investments.$.campaign_id' : req.body
//     }},
//          function(err,model) {
//      if(err){
//          console.log(err);
//          return res.send(err);
//        }
//        return res.json(model);
// });
});

//
// Person.update({'items.id': 2}, {'$set': {
//     'items.$.name': 'updated item2',
//     'items.$.value': 'two updated'
// }}, function(err) { ..



  //
  // investments : [{
  //     tradeID :  String,
  //     // isPersonal : {type: Boolean, required: true},
  //     _investmnetID : mongoose.Schema.Types.ObjectId,
  //     paymentMethod :  String,
  //     amount : Number,
  //     fee : Number,
  //     campaign_id : String,
  //     invest_date : {type : Date, default: Date.now}
  // }]
// db.collection.update({"_id": args._id, "viewData._id": widgetId}, {$set: {"viewData.$.widgetData": widgetDoc.widgetData}})




//
//                                             FFFFFFFF RRRRRRR   IIIIIII YY     YY    AA     YY      YY  !!
//                                             FF       RR    RR    II    YY   YY    AA AA     YY   YY    !!
//                                             FF       RR    RR    II     YY YY    AA   AA     YY YY     !!
//                                             FFFFFF   RR RR       II       YY    AAAAAAAAA      YY      !!
//                                             FF       RR   RR     II      YY    AA      AA     YY
//                                             FF       RR     RR IIIIIII YYY    AA        AA  YYY        !!

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

// TODO: delete an investment
// router.delete('/user/:userid/investment/:investmentid', (req, res) => {})

module.exports = router;


//        SIMPLY WORK ON DATA FROM db.json
//
//
// router.get('/', (req, res, next)=>{
//   res.status(200).json({
//     message: 'Handling GET requests to /products',
//     message2: "You have accessed the Users data"
//   });
// });
//
// // fetch all Users with this route
// router.get('/users', (req, res, next)=>{
//   const users = userData.users
//   res.status(200).json(users)
// });
//
// // fetch user data with specific id
// router.get('/user/:id', (req, res, next)=>{
//   if(req.params.id < userData.users.length){
//     const user = userData.users[req.params.id]
//     res.status(200).json(user)
//   }
//   else{
//         res.status(404).json({
//             success: false,
//             message : "User Not Found"
//         })
//   }
// });
//
// // fetch investments for specific user with ref to the id
// router.get('/user/:id/investment/:investid',(req, res, next)=>{
//   if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
//     const investment = userData.users[req.params.id].investments[req.params.investid]
//     res.status(200).json({investment})
//   }
//   else {
//     res.status(404).json({
//         message: "Entry not found"
//     });
//   }
// });
//
// // fetch all the investments
// router.get('/investments',(req, res, next)=>{
//   const userInvestments = userData.investments
//   res.status(200).json({userInvestments})
// });
//
// // fetch investment by id
// router.get('/investment/:id', (req,res,next)=>{
//
//   if(req.params.id<userData.investments.length){
//
//     const investment = userData.investments[req.params.id]
//     res.status(200).json({ investment });
//   }
//   else{
//     res.status(404).json({
//       success : false,
//       message: "Not Found"
//     });
//   }
// });
//
// // fetch users for specific investment with ref to the id
// router.get('/investment/:investid/user/:id',(req, res, next)=>{
//
//   if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
//     const user = userData.users[req.params.id].investments[req.params.investid]
//     res.status(200).json(user)
//   }
//   else {
//     res.status(404).json({
//         message: "Entry not found"
//     });
//   }
// });
