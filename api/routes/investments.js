const express = require('express');
const router = express.Router();
const data = require('../../data.json')
const Investment = require('../models/userInvestmentModel')
const mongoose = require('mongoose');

// GET Method
router.get('/test', (req,res,next)=>{
  res.status(200).json({
    message: "Investments accessed"
  });
});
// create a new investment
router.post('/',(req, res, next)=>{
  const investment = new Investment({
    // _investmnetID : new mongoose.Types.ObjectId(),
    userName : req.body.userName,
    UserID :  req.body.userid,
    tradeID : req.body.tradeid,
    isPersonal : req.body.isPersonal,
    paymentMethod : req.body.paymentMethod,
    amount : req.body.amount,
    fee : req.body.fee
  });
investment.save().then(result=>{
  console.log(result);
  res.status(200).json({
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

// get all the investmnets from the db
router.get('/allinvestments',(req, res, next)=>{
  Investment
  .find()
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
router.get('/:investid',(req,res,next)=>{
const investmentID = req.params.investid;
Investment.findById(investmentID)
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

// Update an entry or all the entries for a specific id
router.patch('/:investid',(req, res, next)=>{
  const investmentID = req.params.investid;
  const updateInvest = {};
  for (const ops of req.body){
    updateInvest[ops.propName] = ops.value;
  }
Investment.update( { _id: investmentID}, {$set : updateInvest} )
.exec()
.then(result =>{
  console.log(result);
  res.status(200).json(result);
})
.catct(err=>{
  console.log(err);
  res.status(500).json({
    error: err
  });
 })
});

router.delete('/:investid',(req, res, next)=>{
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
