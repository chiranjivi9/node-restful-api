const mongoose = require('mongoose');

const userInvestSchema = mongoose.Schema({
      _investmnetID : mongoose.Schema.Types.ObjectId,
      // _userid : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
      userName : String,
      userID :  String,
      tradeID :  String,
      isPersonal :  String,
      paymentMethod :  String,
      amount :  Number,
      campaign_id : String,
      fee : Number
});

module.exports = mongoose.model('UserInvestment', userInvestSchema);
