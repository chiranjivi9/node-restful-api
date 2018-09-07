//
//
// PERKS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perkSchema = new Schema({

  _id : false,
  amountThreshold: Number,
  perkContent: String,
  updatedOn : {type: Date, default: Date.now}
})

const CampaignPerk = mongoose.model('CampaignPerk', perkSchema)
module.exports = CampaignPerk
