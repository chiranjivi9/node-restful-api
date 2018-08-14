const express = require('express');

const app = express();

const morgan = require('morgan');

// create a path to the products folder in api
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

// api call to access data under products
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
