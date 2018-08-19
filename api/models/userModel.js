const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      _id : mongoose.Schema.Types.ObjectId,
      user : String,
      email : String,
      investments : [{
            amountInvested : String,
            companyName : String
          }]
});

module.exports = mongoose.model('User', userSchema);

// {
//   "id": 1,
//   "user": "abc",
//   "email": "abc@gmail.com",
//   "investments":[{
//             "investment": 1,
//             "amountInvested" : "$3000" ,
//             "companyName" : "toyota"
//           },
//         {
//           "investment": 1,
//           "amountInvested" : "$3000" ,
//           "companyName" : "Mazda"
//
//           }]
// }
