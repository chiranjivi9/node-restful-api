const express = require('express');
const router = express.Router();
const userData = require('../../db.json')


// GET METHOD
router.get('/', (req, res, next)=>{

    res.status(200).json({
      message: 'Handling GET requests to /products',
      message2: "You have accessed the Users data"
    });
});

// fetch all the users with this route
router.get('/users', (req, res, next)=>{
    const users = userData.users
    res.status(200).json(users)
});

// fetch data with specific id
router.get('/user/:id', (req, res, next)=>{
    if(req.params.id < userData.users.length){
      const user = userData.users[req.params.id]
      res.status(200).json(user)
    }
    else {
          res.status(404).json({
              success: false,
              message : "User Not Found"
          })
    }
});

router.get('/investments',(req, res, next)=>{

    const userInvestments = userData.investments
    res.status(200).json({userInvestments})
});


router.get('/investment/:id', (req,res,next)=>{

  if(req.params.id<userData.investments.length){

    const investment = userData.investments[req.params.id]
    res.status(200).json({ investment });

  }
  else{

      res.status(404).json({

        success : false,
        message: "Not Found"
      });
  }
});

// fetch investments for specific user with ref to the id

router.get('/user/:id/investment/:investid',(req, res, next)=>{

  if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
    const investment = userData.users[req.params.id].investments[req.params.investid]
    res.status(200).json({investment})
  }
  else {
      res.status(404).json({
          message: "Entry not found"
      });
  }
});

// fetch users for specific investment with ref to the id
router.get('/investment/:investid/user/:id',(req, res, next)=>{

  if(req.params.investid<userData.investments.length && req.params.id < userData.users.length){
    const user = userData.users[req.params.id].investments[req.params.investid]
    res.status(200).json(user)
  }
  else {
      res.status(404).json({
          message: "Entry not found"
      });
  }
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
