var express = require('express');
var router = express.Router();
var pet = require('../models/pet.model');
var path = require('path');
var user = require('../models/user.model');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /pets route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    console.log(req.user);
    var responseObject = {
      user: req.user
    };

    user.find(function(err,data){
      if(err){
        console.log(err);
        res.send(req.user);
      }
      else{
        responseObject.userList = data;
      }
    });
    pet.find(function(err,data){
      if(err){
        res.send(req.user);
      }
      else{
        responseObject.pets = data;
        console.log(responseObject);
        res.send(responseObject);
      }
    });

    //**create an object here to send all user info and all pet info**//

    // res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.post('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    console.log(req.user);

    var newPet = pet(req.body);
    newPet.save(function(err){
      if(err){
        console.log(err);
        res.status(500).send(req.user);
      }
      else{
        res.status(201).send(req.user);

      }
    });
    //**create an object here to send all user info and all pet info**//

  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.delete('/:id', function(req,res){
  pet.remove({_id: req.params.id}, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  });
});

router.put('/favorites',function(req,res){
  pet.update({_id: req.body._id},req.body,function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  });
});


module.exports = router;
