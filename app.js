const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create a path to the products folder in api
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userData = require('./db.json')

//
// var MongoClient = require('mongodb').MongoClient;
//
// var uri = "mongodb+srv://cj@wunderfund.co:Chiran@11@cluster0.mongodb.net/test";
// MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
//    const collection = client.userData("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
// //
// // var MongoClient = require('mongodb').MongoClient;
// //
// // var uri = "mongodb://kay:myRealPassword@mycluster0-shard-00-00.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
// // MongoClient.connect(uri, function(err, db) {
// //    db.close();
// // });
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
app.use('/products', productRoute);
app.use('/orders', orderRoute);

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
