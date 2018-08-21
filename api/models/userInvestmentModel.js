const mongoose = require('mongoose');

const userInvestSchema = mongoose.Schema({
      // _investmnetID : mongoose.Schema.Types.ObjectId,
      userName : {type:String, required: true},
      userID :  String,
      tradeID :  {type:String, required: true},
      isPersonal :  {type:Boolean, required: true},
      paymentMethod :  {type:String, required: true},
      amount :  {type:Number, required: true},
      fee : {type:Number, required: true}
});

module.exports = mongoose.model('Investment', userInvestSchema);
