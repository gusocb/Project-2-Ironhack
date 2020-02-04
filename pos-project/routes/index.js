const express = require('express');
const router  = express.Router();
const checkRole = require('../middlewares/checkRoles')
const ensureLogin = require('connect-ensure-login')
const passport = require('../handlers/passport')

//Require models
const User = require('../models/users');
const Product = require('../models/products');
const Movement = require('../models/movements');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// router.post('/signup', (req, res, next) => {
  //   const newUser = new User({...req.body}, req.body.password);
  //   newUser.save()
  //     .then(() => {
    //     res.redirect('/home');
    //   })
    //   .catch((error) => {
      //     console.log(error);
      //   })
      // });
      
router.post('/signup', async(req, res, next) => {
  try{
    await User.register({...req.body}, req.body.password)
    res.redirect('/login')
  }
  catch(error){
    if(error.name == 'UserExistsError'){
      console.log(error)
      //res.redirect('/signup')
      res.render('signup', {message: 'User already exist'})
      return
      // res.render('signup',{message:'The user already exist'});
      // return
    }
  }
  
});

//Login
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  if(req.user.role === 'ADMIN'){
    res.redirect('/products')
  } else if(req.user.role === 'USER'){
    res.redirect('/search')
  } else {
    res.redirect('/login')
  }
})

//Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});


//Products page
router.get('/products', checkRole('ADMIN'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Product.find()
  .then(allproducts =>{
    res.render('products',{prod:allproducts})
  })
  .catch(error => {
    console.log(error)
  })
});


//Add product
router.get('/products/add', checkRole('ADMIN'), (req, res, next) => {
  res.render('product-add')
});

router.post('/products/add', checkRole('ADMIN'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {barcode,name,price,stock} = req.body;
  const newProduct = new Product ({barcode,name,price,stock});

  newProduct.save()
  .then((products) => {
    res.redirect('/products/add');
  })
  .catch((error) => {
    console.log(error);
  })
});


//Product detail
router.get('/products/:productId', checkRole('ADMIN'), ensureLogin.ensureLoggedIn(),(req, res, next) => {
  Product.findById(req.params.productId)
  .then(theproduct => {
    res.render('product-detail',{singleProd:theproduct});
  })
  .catch(error => {
    console.log(error);
  })
});

//Product edit
router.get('/products/:productId/edit',checkRole('ADMIN'), ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Product.findById(req.params.productId)
  .then(change => {
    res.render('product-edit',{changeProd:change});
  })
  .catch(error => {
    console.log(error);
  })
});


//Product edit POST
router.post('/products/:productId/edit', checkRole('ADMIN'), ensureLogin.ensureLoggedIn(),(req, res, next) => {

  Product.findByIdAndUpdate(req.params.productId, {...req.body})
  .then(change => {
    res.redirect(`/products/${req.params.productId}`);
  })
  .catch(error => {
    console.log(error);
  })

});

//Search Products
router.get('/search', ensureLogin.ensureLoggedIn(), checkRole('USER', 'ADMIN'), async (req, res, next) => {
  if (req.query.barcode) {
    const search = await Product.findOne({barcode: req.query.barcode})
    res.json(search)
  } else {
    res.render('search')
  }
});


//Cart
router.get('/cart', ensureLogin.ensureLoggedIn(), checkRole('USER', 'ADMIN'), (req, res, next) => {
  res.render('cart')
});

module.exports = router;