const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create a path to the products folder in api
const usersRoute = require('./api/routes/users');
const investmentRoute = require('./api/routes/userInvestments');
const commentRoute = require('./api/routes/userComments');
const campaignRoute = require('./api/routes/userCampaigns');
const userData = require('./db.json')

// coonnect to the database
mongoose.connect("mongodb+srv://Chiran11:Chiran11@cluster0-o0gcr.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
app.use(morgan('dev'));
// api call to access data under products
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
}
  next();
});

// routes which should handle requests
app.use('/userdata', usersRoute);
app.use('/investmentdata', investmentRoute);
app.use('/commentdata', commentRoute);
app.use('/campaigndata', campaignRoute);

app.use((req,res,next)=>{

    const error = new Error('Not Found');
    error.status=400;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message : error.message
        }
    })
});

module.exports = app;
