const mongoose = require('mongoose');
const userInvestSchema = mongoose.Schema({
      // _userid : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},

      fName : String,
      lName : String,
      campaignId : String,
      tradeId :  Number,
      isPersonal : Boolean,
      amount :  Number,
      paymentMethod :  String,
      fee : Number,
      investDate : {type : Date, default: Date.now}
});
const Investment = mongoose.model('UserInvestment', userInvestSchema);
module.exports = Investment
