const express = require('express');
const router = express.Router();

const data = require('../../data.json')


// GET METHOD Handle incomming get request to orders

// add conditions for the data
// if statement to check whether the /USER exists or not
router.get('/', (req, res, next)=>{

    res.send({
      message: "you have accessed the car models data lib"
    })
    // res.status(200).json({
    //   message: 'Your Order was fetched'
    // });
});

// grab the cars data
router.get('/cars', (req, res, next)=>{
  const cars = data.cars
  res.status(200).json({ cars })
});

// grab the specific id data
router.get('/car/:id',(req, res, next)=>{
  // grab data for a specific id or the array index for the cars data
if(req.params.id < data.cars.length)
  {const car = data.cars[req.params.id]
    res.status(200).json(car)}
      // const carid = data.cars
else {
    res.status(404).json({
      success: false,
      message : "Car Not Found"


    })
}

});

// grab the models data
router.get('/models',(req, res, next)=>{
    const models = data.models
    res.status(200).json({ models })
});
// grab specific id or the array index for the models data
router.get('/model/:id', (req, res, next)=>{

    const model = data.models[req.params.id]
    res.status(200).json(model)

});



// POST METHOD
router.post('/', (req, res, next)=>{
    cars = data.cars
    cars.findById(data.cars[req.params.id])
    .then(product => {
        if(!cars){
            return res.status(404).json({
                  message:"Car not found"
            });
        }
     res.status(200).json({
        message : "url"


     });


    // .catch(err => {
    //     res.status(500).json({
    //       error: err
    //   })

   })
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };

    res.status(201).json({
      message: 'Your Order was created',
      order: order
    });
});

// add a post for the getId route
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
