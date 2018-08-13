const express = require('express')

const app = express();

// create a path to the products folder in api
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

// api call to access data under products
app.use('/products', productRoute);
app.use('/orders', orderRoute);

module.exports = app;
