const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      user : String,
      email : String,
      _id : mongoose.Schema.Types.ObjectId,
      investments : [
        {
            amountInvested : String,
            companyName : String
          }
        ]
});

module.exports = mongoose.model('User', userSchema);


// User is a constructor here
