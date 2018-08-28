const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

  fname : String,
  lname : String,
  email : String,
  password : String,
  _userid : mongoose.Schema.Types.ObjectId,
  investments : [{
      campaign_id : String,
      tradeID :  String,
      isPersonal : {type: Boolean, required: true},
      amount : Number,
      paymentMethod :  String,
      fee : Number,
      _investmnetID : mongoose.Schema.Types.ObjectId,
      invest_date : {type : Date, default: Date.now}
  }]
})
const User = mongoose.model('User', userSchema);
module.exports =  User
// module.exports = mongoose.model('Investment', investmentSchema)
