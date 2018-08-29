const express = require('express');
const router = express.Router();
const userCampaign = require('../models/userCampaignModel');
const CampaignDet = require('../models/userCampaignDets')
const mongoose = require('mongoose');


// [GET]
// get all campaigns
router.get('/campaigns',(req, res, next)=>{
  userCampaign.find()
  // .exec()
  .then(doc => {
    console.log(doc);
    res.status(200).json({
      message : "All Campaigns.",
      Details : doc
    })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      message : "Campaign not found",
      error: err
    })
  })
});


// get campaign by id
router.get('/campaign/:campaignid',(req, res, next)=>{
const id = req.params.campaignid;
userCampaign.findById(id)
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
    res.status(500).json({error:err})
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
  res.status(500).json({error:err});
})
});



// [POST]
// create a campaign
router.post('/campaigns', (req, res, next)=>{
  const campaign = new userCampaign({
    campaign_id : mongoose.Types.ObjectId(),
    campaign_name : req.body.campaign
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
    res.status(500).json({
      message: "Campaign Not Found",
      error : err
    });
  })
});


// add campaign details under a specific campaign usign campaign_id
router.post('/campaign/:campaignid/add',(req, res, next)=>{
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
      res.send(updatedCampaignDet)
    })
  })
});


// [DELETE]
// Delete a campaign with id
router.delete('/campaign/:campaignid',(req, res) => {
  userCampaign.remove({_id: req.params.campaignid}, (err) => {
    if(err){
      res.status(500).send("Campaign does not exist.")
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


module.exports = router;
