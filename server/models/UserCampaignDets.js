const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaigndetSchema = new Schema({
  user_name : String,
  user_role : String,
  user_id : mongoose.Schema.Types.ObjectId,
  comment : String,
  comment_id : mongoose.Schema.Types.ObjectId,
  content : String,
  comment_date : {type : Date, default: Date.now}
})


const CampaignDet = mongoose.model('CampaignDet', campaigndetSchema)
module.exports = CampaignDet
