const mongoose = require('mongoose');
const Schema = mongoose.Schema
const commentSchema = new Schema({
  comments: String,
  fName: String,
  campaignId: String,
  content: String,
  role: String,
  commentDate: {type: Date, default: Date.now}
})
const userComment = mongoose.model('Comment', commentSchema);
module.exports = userComment
