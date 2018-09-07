//
//
// useOfFunds
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundSchema = new Schema({

  _id : false,
  item: String,
  minAmount: Number,
  maxAmount: Number,
  updatedOn: {type: Date, default: Date.now}
})

const CampaignFund = mongoose.model('CampaignFund', fundSchema)
module.exports = CampaignFund
