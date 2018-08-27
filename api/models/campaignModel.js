const mongoose = require('mongoose')

const campaignSchema = mongoose.Schema({
  campaign_id : String,
  investments:[
    {
      investment:{}
    }
  ]

})
