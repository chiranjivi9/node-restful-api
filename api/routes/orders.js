const express = require('express');
const router = express.Router();


// GET METHOD
router.get('/', (req, res, next)=>{

    res.status(200).json({
      message: 'Your Order was fetched'
    });
});

// POST METHOD
router.post('/', (req, res, next)=>{

    res.status(201).json({
      message: 'Your Order was created'
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
