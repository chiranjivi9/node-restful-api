// FAQs
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  _id : false,
  question: String,
  answer: String,
  updatedOn: {type : Date, default: Date.now}

})

const CampaignFaq = mongoose.model('CampaignFaq', faqSchema)
module.exports = CampaignFaq
