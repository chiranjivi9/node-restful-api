const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

  fname : String,
  lname : String,
  email : String,
  password : String,
  _userid : mongoose.Schema.Types.ObjectId,
  investments : [{
      tradeID :  String,
      // isPersonal : {type: Boolean, required: true},
      _investmnetID : mongoose.Schema.Types.ObjectId,
      paymentMethod :  String,
      amount : Number,
      fee : Number,
      campaign_id : String,
      invest_date : {type : Date, default: Date.now}
  }]
})
const User = mongoose.model('User', userSchema);
module.exports =  User
// module.exports = mongoose.model('Investment', investmentSchema)
