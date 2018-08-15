const express = require('express');

const app = express();

// 
const morgan = require('morgan');
//
const bodyParser = require('body-parser');

// create a path to the products folder in api
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');


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
