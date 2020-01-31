const express = require('express');
const router  = express.Router();

//Require models
const User = require('../models/users');
const Product = require('../models/products');
const Movement = require('../models/movements');

/* GET home page */
router.get('/home', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const {username,password} = req.body;
  const newUser = new User({username,password});
  
  newUser.save()
  .then((user) => {
    res.redirect('/home');
  })
  .catch((error) => {
    console.log(error);
  })
});

//Products page
router.get('/products',(req, res, next) => {
  Product.find()
  .then(allproducts =>{
    res.render('products',{prod:allproducts})
  })
  .catch(error => {
    console.log(error)
  })
});


//Add product
router.get('/products/add',(req, res, next) => {
  res.render('product-add')
});

router.post('/products/add',(req, res, next) => {
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
router.get('/products/:productId',(req, res, next) => {
  Product.findById(req.params.productId)
  .then(theproduct => {
    res.render('product-detail',{singleProd:theproduct});
  })
  .catch(error => {
    console.log(error);
  })
});







module.exports = router;
