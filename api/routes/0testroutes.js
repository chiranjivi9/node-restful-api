
       // SIMPLY WORK ON DATA FROM db.json


router.get('/', (req, res, next)=>{
  res.status(200).json({
    message: 'Handling GET requests to /products',
    message2: "You have accessed the Users data"
  });
});

// fetch all Users with this route
router.get('/users', (req, res, next)=>{
  const users = userData.users
  res.status(200).json(users)
});

// fetch user data with specific id
router.get('/user/:id', (req, res, next)=>{
  if(req.params.id < userData.users.length){
    const user = userData.users[req.params.id]
    res.status(200).json(user)
  }
  else{
        res.status(404).json({
            success: false,
            message : "User Not Found"
        })
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

// fetch all the investments
router.get('/investments',(req, res, next)=>{
  const userInvestments = userData.investments
  res.status(200).json({userInvestments})
});

// fetch investment by id
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
