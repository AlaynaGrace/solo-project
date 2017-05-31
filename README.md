# Solo Project

## What's left

* Fix register page (have to click register twice for it to work)
* Continue styling so that it continues to look nice
* Do drop down bar instead of links
* Make a real readme
* Use grunt to minify everything so that it runs faster
* Be able to email a pet sitter with the care information (https://nodemailer.com/about/)
* Be able to upload images from computer
* Create tests
* Actually explain what the app does in an eloquent fashion


## Emailing the Pet Sitter

* Use nodemailer: https://nodemailer.com/about/
* Follow the given code

```

'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'yourpass'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


```
* create a new gmail account strictly for this app
