const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      user : String,
      email : String,
      // _user_id : mongoose.Schema.Types.ObjectId,
      investments : [
        {
            // _user_id : mongoose.Schema.Types.ObjectId,
            // userName : {type:String, required: true},
            // userID :  String,
            tradeID :  String,
            isPersonal : Boolean,
            paymentMethod :  String,
            amount : Number,
            fee : Number
          }
        ]
});

module.exports = mongoose.model('User', userSchema);


// User is a constructor here
