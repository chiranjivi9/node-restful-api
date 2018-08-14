const express = require('express');
const router = express.Router();



// GET METHOD
router.get('/', (req, res, next)=>{

    res.status(200).json({
      message: 'Handling GET requests to /products'
    });
});


// POST METHOD
router.post('/', (req, res, next)=>{
  const product = {
      name: req.body.name,
      price: req.body.price
  };

    res.status(200).json({
      message: 'Handling POST requests to /products',
      createdProduct: product
    });
});

router.post('/products', (req, res, next)=>{

    res.status(201).json({
      message: 'Displaying products'
    });
});

router.get('/:productId', (req, res, next)=>{

  const id = req.params.productId;

  if(id === 'special'){

    res.status(200).json({

      message:"this message belongs to this id",
      id: id

    });
  } else {

      res.status(200).json({

          message : 'you passed an id'
      });
  }
});

router.patch('/:productId', (req,res, next)=>{
    res.status(200).json({

      message:'Updated product'

    });

});

router.delete('/:productId',(req, res, next)=>{

    res.status(200).json({

      message:"Deleted product"

    });

});


module.exports = router;
