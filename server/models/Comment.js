const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comments : String,
  fName : String,
   // TODO lname : String
  campaignId : String,
  content : String,
  role : String,
  // _userid : mongoose.Schema.Types.ObjectId,
  commentDate : {type : Date, default: Date.now}
})
const userComment = mongoose.model('Comment', commentSchema);
module.exports = userComment
// module.exports = mongoose.model('Investment', investmentSchema)
