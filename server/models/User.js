const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  _userid: mongoose.Schema.Types.ObjectId,
  investments: [
    {type: Schema.ObjectId, ref:'userInvestment', required: true}
  ],
  comments:[
    {type: Schema.ObjectId, ref:"Comment"}
  ]
})

const User = mongoose.model('User', userSchema);
module.exports = User

// investments: [
//   {
//     user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
//     _id: false,
//     campaignId: String,
//     tradeId:  String,
//     isPersonal:Boolean,
//     amount: Number,
//     paymentMethod:  String,
//     fee: Number,
//     // _investmnetID: mongoose.Schema.Types.ObjectId,
//     invest_date: {type: Date, default: Date.now}
//   }
// ],
// comments: [
//   {
//     user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
//     _id: false,
//     comment: String,
//     campaignId: String,
//     content: String,
//     role: String,
//     // _userid: mongoose.Schema.Types.ObjectId,
//     commentDate: {type: Date, default: Date.now}
//   }
// ]
