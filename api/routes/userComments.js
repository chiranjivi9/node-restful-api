const express = require('express');
const router = express.Router();
const userComment = require('../models/userCommentModel');
const mongoose = require('mongoose');


// [GET]
// all comments
router.get('/comments', (req, res, next)=>{
  userComment.find()
  .then(result=>{
    console.log(result);
    res.status(200).json({
      message : "comments accessed",
      details: result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message : " Comment Not Found",
      error : err
    })
  })
})


// get one comment for the id
router.get('/comment/:commentid', (req, res, next)=>{
  const id = req.params.commentid;
  userComment.findById(id, (err, user)=>{
    if(err) return next(err)
    res.json(user)
  })
})



// [POST]
// create a comment
router.post('/comments', (req, res, next)=>{
  const comment = new Comment({
    comments : req.body.comments,
    // _id : mongoose.Types.ObjectId(),
    fname : req.body.fname,
    campaign_id : req.body.campaign_id,
    content : req.body.content,
    // role : (req.body.role == 'Investor', 'Admin', 'Anonymous')
  });
  comment.save().then(doc=>{
    console.log(doc);
    res.status(200).json({
      message : "Comments",
      details : doc
    })
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})


// [DELETE]
// delete a comment with id
router.delete('/comment/:commentid',(req, res, next)=>{
  userComment.remove({_id: req.params.commentid}, (err) => {
    if (err) res.status(500).send("Comment does not exist.")
    res.status(200).send("Comment deleted successfully.")
  })
})
module.exports = router;
