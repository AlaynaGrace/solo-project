/* jshint esversion: 6 */

const nodemailer = require('nodemailer');
const express = require('express');
var router = express.Router();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'our.hobby.farm.app@gmail.com',
        pass: 'SoloProject2017!'
    }
});

router.post('/', function(req,res){
  // setup email data with unicode symbols
  var message = '<h3>Hello Pet Sitter!</h3><h4>The instructions for the care for my pet(s) are below.</h4><br><p>';
  message += req.body.careInfo + '</p>';
  var mailOptions = {
      from: '"Our Hobby Farm App" <our.hobby.farm.app@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Pet Care Information', // Subject line
      html: message, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.sendStatus(500);
      }
      else{
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.sendStatus(200);
      }
  });


});

module.exports = router;
