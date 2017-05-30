/* jshint esversion: 6 */

var express = require('express');
var router = express.Router();
//require twilio
var twilio = require('twilio');

// Twilio Credentials
var accountSid = 'AC7073861fc7460113a38a0a9836bb8918';
var authToken = '88ab9d1f6ef60e0a8bb0845f64836690';

//require the Twilio module and create a REST client
var client = twilio(accountSid, authToken);

router.post('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    var message = '';
    for (let i = 0; i < req.body.action.fed.length; i++) {
      message += req.body.action.fed[i] + '\n';
    }
    for (let i = 0; i < req.body.action.watered.length; i++) {
      message += req.body.action.watered[i] + '\n';
    }
    client.messages.create({
        to: req.body.number,
        from: "+17633163561",
        body: message,
    }, function(err, message) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        console.log(message.sid);
        res.sendStatus(200);
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

module.exports = router;
