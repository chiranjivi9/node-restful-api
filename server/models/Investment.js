const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userInvestSchema = new Schema({
  campaignId: String,
  tradeId: String,
  isPersonal: Boolean,
  amount: Number,
  paymentMethod: String,
  fee: Number,
  investDate: {type: Date, default: Date.now},
  userId: {type: Schema.ObjectId, ref:'User', required: true},
  campaignId: {type: Schema.ObjectId, ref:'userCampaign', required: true}
});

const Investment = mongoose.model('userInvestment', userInvestSchema);
module.exports = Investment
