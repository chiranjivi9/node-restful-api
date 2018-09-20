const Joi = require('joi');
const express = require('express');
const router = express.Router();
const userCampaign = require('../../models/Campaign');
const User = require('../../models/User');
const Investment = require('../../models/Investment');
const mongoose = require('mongoose');

// [GET]
// get all campaigns
router.get('/',(req, res, next)=>{
  userCampaign.find()
  .then(docs => {
    console.log(docs);
    res.status(200).json({
      message: "All Campaigns.",
      Details: docs
    })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      message: "Campaign not found",
      error: err
    })
  })
});

// get campaign under a specific id
router.get('/:campaignid',(req, res, next)=>{
  const id = req.params.campaignid;
  userCampaign.findById(id)
  .exec()
  .then(docs => {
    console.log("From database", docs);
    if(docs){
      res.status(200).json({
        message: "Campaign",
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
      message: "Campaign not found."
    });
  });
});

// [POST]
router.post('/:campaignid',(req,res,next)=>{
  res.status(404).send({
    message: "User already exists."
  })
})

// create a campaign
router.post('/', (req, res, next)=>{
  const {error} = validateCampaign(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const campaign = new userCampaign({
    campaignInfo: {
      campaignName: req.body.campaignInfo.campaignName,
      minimumGoal: req.body.campaignInfo.minimumGoal, // minimum $10,000
      maximumGoal: req.body.campaignInfo.maximumGoal, // maximum $1,070,000
      industries: req.body.campaignInfo.industries,
      faqs: req.body.campaignInfo.faqs,
      question: req.body.campaignInfo.question,
      answer: req.body.campaignInfo.answer
    },
    companyInfo:{
      companyTitle: req.body.companyInfo.companyTitle,
      companySubtitle: req.body.companyInfo.companySubtitle,
      companyDescription: req.body.companyInfo.companyDescription,
      companySiteUrl: req.body.companyInfo.companySiteUrl,
      companyName: req.body.companyInfo.companyName,
      companyAddress1: req.body.companyInfo.companyAddress1,
      companyAddress2: req.body.companyInfo.companyAddress2,
      companyCity: req.body.companyInfo.companyCity,
      companyState: req.body.companyInfo.companyState,
      companyZip: req.body.companyInfo.companyZip
    },
    issuerInfo:{
      issuerFName: req.body.issuerInfo.issuerFName,
      issuerLName: req.body.issuerInfo.issuerLName,
      issuerName: req.body.issuerInfo.issuerName,
      issuerAddress1: req.body.issuerInfo.issuerAddress1,
      issuerAddress2: req.body.issuerInfo.issuerAddress2,
      issuerCity: req.body.issuerInfo.issuerCity,
      issuerState: req.body.issuerInfo.issuerState,
      issuerZip: req.body.issuerInfo.issuerZip
    },
    offeringInfo: {
      offeringType: req.body.offeringInfo.offeringType, // 'A', 'A+', 'D' for the other options
      securityType: req.body.offeringInfo.securityType,
      discount: req.body.offeringInfo.discount,
      valuationCap: req.body.offeringInfo.valuationCap,
      minimumInvestmentAmount: req.body.offeringInfo.minimumInvestmentAmount,
      perks: req.body.offeringInfo.perks,

      amountThreshold: req.body.offeringInfo.amountThreshold,
      perkContent: req.body.offeringInfo.perkContent,

      useOfFunds: req.body.offeringInfo.useOfFunds,

      item: req.body.offeringInfo.useOfFunds.item,
      minAmount: req.body.offeringInfo.useOfFunds.minAmount,
      maxAmount: req.body.offeringInfo.useOfFunds.maxAmount
    },
    socialMediaInfo: req.body.socialMediaInfo,
    brand: req.body.socialMediaInfo.brand,
    url: req.body.socialMediaInfo.url //validate it on the front end
});
  campaign.save().then(result=>{
    console.log(result);
    res.status(200).json({
      message: "Campaign Created!",
      Details: result
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({
      message: "Campaign Not Found",
      error: err
    });
  })
});

// [PUT]
router.put('/',(req, res,next)=>{
  res.status(404).json({
    message: "Please enter an ID."
  })
})

// update/modify a campaign
router.put('/:campaignid',(req, res, next) => {
  userCampaign.findById(req.params.campaignid, (err, user) => {
    if (err) return res.status(404).send({error: "Campaign not found"})
      const { error } = validateCampaign(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        user.campaignInfo = {}
        user.campaignInfo = req.body.campaignInfo
        user.faqs = []
        user.faqs = req.body.faqs
        user.updates = []
        user.updates = req.body.updates
        user.comments = []
        user.comments = req.body.comments
        user.investments = []
        user.investments = req.body.investments
        user.companyInfo = {}
        user.companyInfo = req.body.companyInfo
        user.issuerInfo = {}
        user.issuerInfo = req.body.issuerInfo
        user.offeringInfo = {}
        user.offeringInfo = req.body.offeringInfo
        user.perks = []
        user.perks = req.body.perks
        user.useOfFunds = []
        user.useOfFunds  = req.body.useOfFunds
        user.socialMediaInfo = []
        user.socialMediaInfo = req.body.socialMediaInfo
    console.log(user);
    user.save(err => {
      if (err) return res.send(err.message)
      res.status(200).send({
        message: "Campaign updated successfully!",
        Details: user})
    })
  })
})

// [DELETE]
router.delete('/',(req, res,next)=>{
  res.status(404).json({
    message: "Please enter an ID."
  })
})

// Delete a campaign with id
router.delete('/:campaignid',(req, res) => {
  userCampaign.remove({_id: req.params.campaignid}, (err) => {
    if(err){
      res.status(404).send("Campaign not found.")
    }
    else{
      res.status(200).send("Campaign deleted successfully.")
    }
  })
});

// fn - Validate User input
function validateCampaign (data) {
  const schema = {
    campaignInfo: Joi.object({
      campaignName: Joi.string().regex(/^[a-zA-Z#$&-_@]*$/).required(),
      minimumGoal: Joi.number().required(), // minimum $10,000
      maximumGoal: Joi.number().required(), // maximum $1,070,000
      industries: Joi.string().required(),
      faqs: Joi.array().items(Joi.object({
          question: Joi.string().trim().min(4).max(500).required(),
          answer: Joi.string().trim().max(1000).required()
        })
      ),
      updates: Joi.array().items(Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required()
        })
      ),
      comments: Joi.array().items(Joi.object({
          comment: Joi.string(),
          role: Joi.string(),
          content: Joi.string().trim().min(4).max(1000)
        })
      ),
      investments: Joi.array().items()
    }),
    companyInfo: Joi.object({
      companyTitle: Joi.string().trim().min(2).required(),
      companySubtitle: Joi.string().trim().min(3),
      companyDescription: Joi.string().trim().max(5000).required(),
      companySiteUrl: Joi.string().trim().min(5).required(),
      companyName: Joi.string().trim().min(2).regex(/^[a-zA-Z0-9@$#&_]*$/).required(),
      companyAddress1: Joi.string().trim().max(100).required(),
      companyAddress2: Joi.string(),
      companyCity: Joi.string().trim().max(72).required(),
      companyState: Joi.string().trim().max(72).required(),
      companyZip: Joi.number().required()
    }),
    issuerInfo: Joi.object({
      issuerFName: Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
      issuerLName: Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
      issuerAddress1: Joi.string().trim().max(100).required(),
      issuerAddress2: Joi.string(),
      issuerCity: Joi.string().trim().max(72).required(),
      issuerState: Joi.string().trim().max(72).required(),
      issuerZip: Joi.number().required()
    }),
    offeringInfo: Joi.object({
      offeringType: Joi.string().required(), // 'A', 'A+', 'D' for the other options
      securityType: Joi.string().required(),
      discount: Joi.number().required(),
      valuationCap: Joi.number().required(),
      minimumInvestmentAmount: Joi.number().required(),
      perks: Joi.array().items({
        amountThreshold: Joi.number().required(),
        perkContent: Joi.string().required()
      }),
      useOfFunds: Joi.array().items({
        item: Joi.string().required(),
        minAmount: Joi.number().required(),
        maxAmount: Joi.number().required()
      })
    }),
    socialMediaInfo: Joi.array().items({
      brand: Joi.string().trim().max(72).required(),
      url: Joi.string().uri().required()
    })
  }
  return Joi.validate(data, schema)
}

module.exports = router;
