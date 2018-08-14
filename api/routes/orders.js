const express = require('express');
const router = express.Router();


// GET METHOD Handle incomming get request to orders
router.get('/', (req, res, next)=>{

    res.status(200).json({
      message: 'Your Order was fetched'
    });
});

// POST METHOD
router.post('/', (req, res, next)=>{


    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };

    res.status(201).json({
      message: 'Your Order was created',
      order: order
    });
});

router.get('/:orderId', (req, res, next)=>{

    res.status(200).json({
      message:"Order Details",
      orderId: req.params.orderId

    });
});

router.delete('/:orderId', (req, res, next)=>{

  res.status(200).json({
    message:"Order Deleted",
    orderId: req.params.orderId

  });
});


module.exports = router;
