const express = require('express');
const router = express.Router();
const Joi = require('joi')
// const data = require('../../data.json')
const Investment = require('../../models/Investment')
const mongoose = require('mongoose');
const userModel = require('../../models/User');


// [GET]
// Get all investments
router.get('/',(req, res, next)=>{
  Investment
  .find()
  // .populate('_userid')
  .exec()
  .then(docs=>{
    console.log(docs);
    if(docs.length >= 0){
      res.status(200).json({
        message : "All Investments.",
        Details : docs
      });
   }
    else{
    res.status(404).json({
       message : "There are no investments in the database currently."
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
.populate('_userid')
.exec()
.then(docs=>{
  console.log("From databse", investmentID);
    if(docs){
    res.status(200).json({
      message : "Investment.",
      Details : docs});
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

// create an investment
router.post('/', (req,res)=>{
  const{error} = validateInvestment(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const investment = new Investment({
    fName : req.body.fName,
    lName : req.body.lName,
    tradeId : req.body.tradeId,
    isPersonal : req.body.isPersonal ,
    paymentMethod : req.body.paymentMethod,
    amount : req.body.amount,
    campaignId : req.body.campaignId,
    fee : req.body.fee
  })
  investment.save(err=>{
    if(err) return res.send(err.message)
    return res.status(200).send(investment)
  })
});


// [PUT]

// update an investment
router.put('/:investid',(req, res)=>{
  Investment.findById(req.params.investid, (err, investment)=>{
    if(err) return res.status(404).send(err.message)
    const {error} = validateInvestment(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    investment.fName = req.body.fName,
    investment.lName = req.body.lName,
    investment.tradeId = req.body.tradeId,
    investment.isPersonal = req.body.isPersonal ,
    investment.paymentMethod = req.body.paymentMethod,
    investment.amount = req.body.amount,
    investment.campaignId = req.body.campaignId,
    investment.fee = req.body.fee

    investment.save(err=>{
      if(err) return res.send(err.message)
      res.status(200).send(investment)
    })
  })
});


// [DELETE]
//  Delete an investment
router.delete('/:investid',(req, res, next)=>{
  const id = req.params.investid;
  Investment.remove({ _id: id })
  .exec()
  .then(result=>{
    res.status(200).json({
        message : "Investment entry deleted successfully."
    });
  })
  .catch(err =>{
    res.status(404).json({
      message : "ID entered not found."
    });
  })
});


function validateInvestment(data) {
  const schema = {

    fName : Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
    lName : Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
    campaignId : Joi.number().required(),
    tradeId :  Joi.number().required(),
    isPersonal : Joi.boolean().required(),
    amount :  Joi.number().required(),
    paymentMethod :  Joi.string().trim().min(3).regex(/^[a-zA-Z]*$/).required(),
    fee : Joi.number().required()
  }

  return Joi.validate(data, schema)
}


module.exports = router;
