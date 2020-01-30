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
  res.send('THIS IS THE PRODUCTS PAGE')
});

router.get('/products/create-product',(req, res, next) => {
  res.render('create-product')
});

router.post('/products/create-product',(req, res, next) => {
  const {barcode,name,price,existence} = req.body;
  const newProduct = new Product ({barcode,name,price,existence});

  newProduct.save()
  .then((products) => {
    res.redirect('/products/create-product');
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;
