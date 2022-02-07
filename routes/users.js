var express = require('express');
const User = require('../models/User.model');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is user');
});

router.get('/test', function(req, res, next) {
  res.send('We are still in user');
});

router.get('/create-user', function(req, res, next) {
  res.render('create-user')
});


router.post('/create-user' , (req, res)=>{
  User.create({
    name: req.body.name
  }).then(createdUser=>{
    console.log("User created", createdUser)
    res.render('index', {title: `User ${req.body.name} has been created!`})
  })
  .catch(err=>{
    console.log('Something went wrong', err)
  })
})

module.exports = router;
