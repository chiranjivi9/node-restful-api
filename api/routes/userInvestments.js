const express = require('express');
const router = express.Router();
const data = require('../../data.json')
const Investment = require('../models/userInvestmentModel')
const mongoose = require('mongoose');
const userModel = require('../models/userModel');


// [GET]
// GET Method
router.get('/test', (req,res,next)=>{
  res.status(200).json({
    message: "Investments accessed"
  });
});


// Get all investments
router.get('/investments',(req, res, next)=>{
  Investment
  .find()
  // .populate('_userid')
  .exec()
  .then(docs=>{
    console.log(docs);
    if(docs.length >= 0){
      res.status(200).json(docs);
   }
    else{
    res.status(404).json({
       message : "Not Found."
     })
   }
 })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
});


// get investment for a specific ID
router.get('/investment/:investid',(req,res,next)=>{
const investmentID = req.params.investid;
Investment.findById(investmentID)
.populate('_userid')
.exec()
.then(doc=>{
  console.log("From databse", investmentID);
    if(doc){
    res.status(200).json({doc});
    }
    else{
    res.status(404).json({message: "Invalid Entry for the ID entered"})
    }
  })
.catch(err=>{
  console.log(err);
  res.status(500).json({
    error: err
   });
 })

});


// [POST]
// create a new investment
router.post('/investments',(req, res, next)=>{
  const investment = new Investment  ({
    _investmnetID : new mongoose.Types.ObjectId(),
    // userName : req.body.userName,
    _userid : req.body.userid,
    tradeID : req.body.tradeid,
    isPersonal : req.body.ispersonal ,
    paymentMethod : req.body.paymentmethod,
    amount : req.body.amount,
    campaign_id : req.body.campaign_id,
    fee : req.body.fee
    // invest_date : {type : Date, default: Date.now}
  });
investment.save().then(result=>{
  console.log(result);
  res.status(201).json({
    investment : result
  });
})
.catch(err =>{
  console.log(err);
  res.status(500).json({
    error: err
  });
 });
});


// [PUT]
// Update an entry or all the entries for a specific id
router.put('/investment/:investid',(req, res, next)=>{
  const id = req.params.investid;
  Investment.update({'_id': id},{'$set':{
    tradeID: req.body.tradeid,
    paymentMethod : req.body.paymentmethod,
    campaign_id : req.body.campaign_id,
    amount : req.body.amount,
    isPersonal : req.body.isPersonal,
    fee : req.body.fee
  }},(err)=>{
        if (err) {
          return next(err)
        }
        res.status(200).send("Investment Updated!")
      });
});


// [DELETE]
//  Delete an investment
router.delete('/investment/:investid',(req, res, next)=>{
  const id = req.params.investid;
  Investment.remove({ _id: id })
  .exec()
  .then(result=>{
    res.status(200).json({
        message : "investment entry deleted successfully."
    });
  })
  .catch(err =>{
    res.status(500).json({
      error : err,
      message : "ID entered does not exist."
    });
  })
});


module.exports = router;
