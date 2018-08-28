const mongoose = require('mongoose');
const userInvestSchema = mongoose.Schema({
      // _userid : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},

      userName : String,
      userID :  String,
      campaign_id : String,
      tradeID :  String,
      isPersonal :  {type: Boolean, required: true},
      amount :  Number,
      paymentMethod :  String,
      fee : Number,
      _investmnetID : mongoose.Schema.Types.ObjectId,
      invest_date : {type : Date, default: Date.now}
});
const Investment = mongoose.model('UserInvestment', userInvestSchema);
module.exports = Investment
