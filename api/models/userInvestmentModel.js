const mongoose = require('mongoose');

const userInvestSchema = mongoose.Schema({
      // _investmnetID : mongoose.Schema.Types.ObjectId,
      userName : String,
      userID : String,
      tradeID : String,
      isPersonal : Boolean,
      paymentMethod : String,
      amount : Number,
      fee : Number
});

module.exports = mongoose.model('Investment', userInvestSchema);
