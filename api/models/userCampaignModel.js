const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  campaign_id : mongoose.Schema.Types.ObjectId,
  campaign_name : String,
  campaign_details:[{
    
    user_name : String,
    user_id : mongoose.Schema.Types.ObjectId,
    comment : String,
    comment_id : mongoose.Schema.Types.ObjectId,
    content : String,
    comment_date : {type : Date, default: Date.now}

    }]
})

const userCampaign = mongoose.model('userCampaign', campaignSchema);
module.exports = userCampaign

// module.export = mongoose.model('Campaign', campaignSchema)
