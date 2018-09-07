const Joi = require('joi');
const express = require('express');
const router = express.Router();
const userCampaign = require('../../models/Campaign');
const mongoose = require('mongoose');
// [GET]
// get all campaigns
router.get('/',(req, res, next)=>{
  userCampaign.find()
  // .exec()
  .then(docs => {
    console.log(docs);
    res.status(200).json({
      message : "All Campaigns.",
      Details : docs
    })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      message : "There are no campaigns in the database currently.",
      error: err
    })
  })
});

// get campaign by id
router.get('/:campaignid',(req, res, next)=>{
  const id = req.params.campaignid;
  userCampaign.findById(id)
  .exec()
  .then(docs => {
    console.log("From database", docs);
    if(docs){
      res.status(200).json({
        message : "Campaign",
        Details : docs
      });
    }
    else{
      res.status(404).json({ message : "No valid entry for the entered ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(404).send({
      message : "Not Found."
    });
  });
});


// get all details under a specific campaign id
router.get('/campaign/:campaignid/details',(req, res, next)=>{
  const uid = req.params.campaignid;
  userCampaign.findById(uid)
  .select('campaign_details')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(404).json({error:err})
  })
});


router.get('/campaign/:campaignid/companyinfo',(req, res, next)=>{
  const uid = req.params.campaignid;
  userCampaign.findById(uid)
  .select('companyInfo')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(404).json({error:err})
  })
});
router.get('/campaign/:campaignid/issuerinfo',(req, res, next)=>{
  const uid = req.params.campaignid;
  userCampaign.findById(uid)
  .select('issuerInfo')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(404).json({error:err})
  })
});
router.get('/campaign/:campaignid/offeringinfo',(req, res, next)=>{
  const uid = req.params.campaignid;
  userCampaign.findById(uid)
  .select('offeringInfo')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(404).json({error:err})
  })
});

router.get('/campaign/:campaignid/socialmedia',(req, res, next)=>{
  const uid = req.params.campaignid;
  userCampaign.findById(uid)
  .select('socialMediaInfo')
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch( err => {
    console.log(err);
    res.status(404).json({error:err})
  })
});


// get a particular campaign detail under a specific campaign with id
router.get('/campaign/:campaignid/detail/:userid',(req, res, next)=>{
  const uid = req.params.campaignid;
  // const iid = User.investments;
  userCampaign.find( { _id: req.params.campaignid}, { investments: { $elemMatch: { _id: req.params.userid} } })
  .then(docs =>{
    console.log(docs);
    res.status(200).json(docs)
  })
.catch(err=>{
  console.log(err);
  res.status(404).json({error:err});
})
});


// [POST]
// create a campaign
router.post('/', (req, res, next)=>{
  const {error} = validateCampaign(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const campaign = new userCampaign({
    campaignInfo: {
      campaignName: req.body.campaignName,
      minimumGoal: req.body.minimumGoal, // minimum $10,000
      maximumGoal: req.body.maximumGoal, // maximum $1,070,000
      industries: req.body.industries,
        faqs: [
          {
            question: req.body.question,
            answer: req.body.answer
          }
        ],
        updates: [
          {
            title: req.body.title,
            description: req.body.description
          }
        ],
        comments: [
          {
            role: req.body.role,
            content: req.body.content
          }
        ]
    },
    companyInfo: {
      companyTitle: req.body.companyTitle,
      companySubtitle: req.body.companySubtitle,
      companyDescription: req.body.companyDescription,
      companySiteUrl: req.body.companySiteUrl,
      companyName: req.body.companyName,
      companyAddress1: req.body.companyAddress1,
      companyAddress2: req.body.companyAddress2,
      companyCity: req.body.companyCity,
      companyState: req.body.companyState,
      companyZip: req.body.companyZip,
    },
    issuerInfo: {
      issuerFName: req.body.issuerFName,
      issuerLName : req.body.issuerLName,
      issuerName: req.body.issuerName,
      issuerAddress1: req.body.issuerAddress1,
      issuerAddress2: req.body.issuerAddress2,
      issuerCity: req.body.issuerCity,
      issuerState: req.body.issuerState,
      issuerZip: req.body.issuerZip,
    },
    offeringInfo: {
      offeringType: req.body.offeringType, // 'A', 'A+', 'D' for the other options
      securityType: req.body.securityType,
      discount: req.body.discount,
      valuationCap: req.body.valuationCap,
      minimumInvestmentAmount: req.body.minimumInvestmentAmount,
        perks: [
          {
            amountThreshold: req.body.amountThreshold,
            perkContent: req.body.perkContent,
          }
        ],
        useOfFunds: [
          {
            item : req.body.item,
            minAmount: req.body.minAmount,
            maxAmount: req.body.maxAmount
          }
        ]
    },
    socialMediaInfo: [
      {
        brand: req.body.brand,
        url: req.body.url //validate it on the front end
      }
    ]
  });
  campaign.save().then(result=>{
    console.log(result);
    res.status(200).json({
      message: "Campaign Created!",
      Details : result
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({
      message: "Campaign Not Found",
      error : err
    });
  })
});


// [PUT]

router.put('/:campaignid',(req, res, next) => {
  userCampaign.findById(req.params.campaignid, (err, user) => {
    if (err) return res.status(404).send({error: "ID Not Found"})
      const { error } = validateCampaign(req.body)
        if (error) return res.status(400).send(error.details[0].message)
          user.campaignInfo = {}
          user.campaignInfo = req.body.campaignInfoData
          user.campaignInfo.faqs = []
          user.campaignInfo.faqs = req.body.faqData
          user.campaignInfo.updates = []
          user.campaignInfo.updates = req.body.updateData
          user.campaignInfo.comments = []
          user.campaignInfo.comments = req.body.commentData
          user.companyInfo = {}
          user.companyInfo = req.body.compnayInfoData
          user.issuerInfo = {}
          user.issuerInfo = req.body.issuerInfoData
          user.offeringInfo = {}
          user.offeringInfo = req.body.offeringInfoData
          user.offeringInfo.perks = []
          user.offeringInfo.perks = req.body.perkData
          user.offeringInfo.useOfFunds = []
          user.offeringInfo.useOfFunds  = req.body.useOfFundData
          user.socialMediaInfo = []
          user.socialMediaInfo = req.body.somedData
          console.log(user);
    user.save(err => {
      if (err) return res.send(err.message)
      res.status(200).send(user)
    })
  })
})

// codeforcomments
// add campaign details under a specific campaign usign campaign_id
router.put('/campaign/:campaignid/addcomments',(req, res, next)=>{
  userCampaign.findById(req.params.campaignid, (err, campaign_det)=>{
    if(err) console.log(err)
    const new_campaign_det = new CampaignDet({
      // s_id : new mongoose.Types.ObjectId(),
      user_name : req.body.u_name,
      user_id : new mongoose.Types.ObjectId(),
      comment : req.body.comment,
      comment_id : new mongoose.Types.ObjectId(),
      content : req.body.content
    })
    campaign_det.campaign_details.push(new_campaign_det)
    campaign_det.save((err, updatedCampaignDet) =>{
      if(err) return next(err)
      console.log(updatedCampaignDet)
      res.send(updatedCampaignDet)
    })
  })
});


// route to add faq
router.put('/campaign/:campaignid/addfaqs',(req, res, next)=>{
  userCampaign.findById(req.params.campaignid, (err, campaign_faq)=>{
    if(err) console.log(err)
    const new_campaign_faq = new CampaignFaq({

      question: req.body.question,
      answer: req.body.answer,

    })
    campaign_faq.faqs.push(new_campaign_faq)
    campaign_faq.save((err, updatedCampaignFaq) =>{
      if(err) return next(err)
      console.log(updatedCampaignFaq)
      res.send(updatedCampaignFaq)
    })
  })
});


// add perks to array
router.put('/campaign/:campaignid/addperks',(req, res, next)=>{
  userCampaign.findById(req.params.campaignid, (err, campaign_perk)=>{
    if(err) console.log(err)
    const new_campaign_perk = new CampaignPerk({
      amountThreshold: req.body.amountThreshold,
      perkContent: req.body.perkContent,
    })
    campaign_perk.offeringInfo.perks.push(new_campaign_perk)
    campaign_perk.save((err, updatedCampaignPerk) =>{
      if(err) return next(err)
      console.log(updatedCampaignPerk)
      res.send(updatedCampaignPerk)
    })
  })
});
//


// add user of funds to the array
router.put('/campaign/:campaignid/addfunds',(req, res, next)=>{
  userCampaign.findById(req.params.campaignid, (err, campaign_fund)=>{
    if(err) console.log(err)
    const new_campaign_Fund = new CampaignFund({

      item: req.body.item,
      minAmount: req.body.minAmount,
      maxAmount: req.body.maxAmount

    })
    campaign_fund.offeringInfo.useOfFunds.push(new_campaign_Fund)
    campaign_fund.save((err, updatedCampaignFund) =>{
      if(err) return next(err)
      console.log(updatedCampaignFund)
      res.send(updatedCampaignFund)
    })
  })
});


// add social media info to the array
router.put('/campaign/:campaignid/addsomed',(req, res, next)=>{
  userCampaign.findById(req.params.campaignid, (err, campaign_somed)=>{
    if(err) console.log(err)
    const new_campaign_Somed = new CampaignSomed({

      brand: req.body.brand,
      url: req.body.url

    })
    campaign_somed.socialMediaInfo.push(new_campaign_Somed)
    campaign_somed.save((err, updatedCampaignSomed) =>{
      if(err) return next(err)
      console.log(updatedCampaignSomed)
      res.send(updatedCampaignSomed)
    })
  })
});


// [DELETE]
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


// delete an entry under the campaign
router.delete('/campaign/:campaignid/:userid',(req, res, next)=>{
  const id = req.params.campaignid;
  const iid = req.params.userid;
  userCampaign.update(
      {'_id': id},
      { $pull: { "campaign_details" : { '_id': iid } } },
      (err)=>{
            if (err) {
              return next(err)
            }
            res.status(200).send("Comment Deleted Successfully!")
          });
});


function validateCampaign (data) {
    const schema = {
        campaignName: Joi.string().required(),
        minimumGoal: Joi.number().required(), // minimum $10,000
        maximumGoal: Joi.number().required(), // maximum $1,070,000
        industries: Joi.string().required(),
        question: Joi.string().trim().max(500).required(),
        answer: Joi.string().trim().max(1000).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        role: Joi.string().required(),
        content: Joi.string().trim().max(1000).required(),
        companyTitle: Joi.string().trim().min(2).required(),
        companySubtitle: Joi.string().trim().min(3),
        companyDescription: Joi.string().trim().max(5000).required(),
        companySiteUrl: Joi.string().trim().min(5).required(),
        companyName: Joi.string().trim().min(2).regex(/^[a-zA-Z0-9@$#&]*$/).required(),
        companyAddress1: Joi.string().trim().max(100).required(),
        companyAddress2: Joi.string(),
        companyCity: Joi.string().trim().max(72).required(),
        companyState: Joi.string().trim().max(72).required(),
        companyZip: Joi.number().required(),
        issuerFName : Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
        issuerLName : Joi.string().trim().min(2).regex(/^[a-zA-Z]*$/).required(),
        issuerAddress1: Joi.string().trim().max(100).required(),
        issuerAddress2: Joi.string(),
        issuerCity: Joi.string().trim().max(72).required(),
        issuerState: Joi.string().trim().max(72).required(),
        issuerZip: Joi.number().required(),
        offeringType: Joi.string().required(), // 'A', 'A+', 'D' for the other options
        securityType: Joi.string().required(),
        discount: Joi.number().required(),
        valuationCap: Joi.number().required(),
        minimumInvestmentAmount: Joi.number().required(),
        amountThreshold: Joi.number().required(),
        perkContent: Joi.string().required(),
        item: Joi.string().required(),
        minAmount: Joi.number().required(),
        maxAmount: Joi.number().required(),
        brand: Joi.string().trim().max(72).required(),
        url: Joi.string().uri().required() //validate it on the front end
    }
    return Joi.validate(data, schema)
}

module.exports = router;
