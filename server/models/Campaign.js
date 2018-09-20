const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const campaignSchema = new Schema({
campaignInfo: {
  campaignName: String,
  minimumGoal: Number, // minimum $10,000
  maximumGoal: Number, // maximum $1,070,000
  industries: String,
  faqs: [
    {
      _id: false,
      question: String,
      answer: String
    }
  ],
  updates: [
    {
      _id: false,
      update_timestamp: {type: Date, default: Date.now},
      title:String,
      description: String
    }
  ],
  comments: [
    {
      comment_date: {type: Date, default: Date.now},
      role: String,
      content: String
    }
  ],
  investments: [
    {type: Schema.ObjectId, ref:"userInvestment"}
  ]
},
companyInfo: {
  companyTitle: String,
  companySubtitle: String,
  companyDescription: String,
  companySiteUrl: String,
  companyName: String,
  companyAddress1: String,
  companyAddress2: String,
  companyCity: String,
  companyState: String,
  companyZip: Number,
},
issuerInfo: {
  issuerFName: String,
  issuerLName: String,
  issuerAddress1: String,
  issuerAddress2: String,
  issuerCity: String,
  issuerState: String,
  issuerZip: Number,
},
offeringInfo: {
  offeringType: String, // 'A', 'A+', 'D' for the other options
  securityType: String,
  discount: Number,
  valuationCap: Number,
  minimumInvestmentAmount: Number,
  perks: [
    {
      _id: false,
      amountThreshold: Number,
      perkContent: String,
    }
  ],
  useOfFunds: [
    {
      _id: false,
      item: String,
      minAmount: Number,
      maxAmount: Number
    }
  ]
},
socialMediaInfo: [
  {
    _id: false,
    brand: String,
    url: String
  }
]
})

const userCampaign = mongoose.model('userCampaign', campaignSchema);
module.exports = userCampaign
