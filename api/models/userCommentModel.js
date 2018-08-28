const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comments : String,
  fname : String,
  campaign_id : String,
  content : String,
  role : String,
  // _userid : mongoose.Schema.Types.ObjectId,
  comment_date : {type : Date, default: Date.now}
})
const userComment = mongoose.model('Comment', commentSchema);
module.exports = userComment
// module.exports = mongoose.model('Investment', investmentSchema)
