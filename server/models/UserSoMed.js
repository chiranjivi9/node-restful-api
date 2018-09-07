//
//
// SoMed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const somedSchema = new Schema({

    _id : false,
    brand: String,
    url: String,
    updateOn: {type: Date, default: Date.now}
})

const CampaignSomed = mongoose.model('CampaignSomed', somedSchema)
module.exports = CampaignSomed
