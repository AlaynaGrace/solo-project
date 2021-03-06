var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');

var passport = require('./strategies/user.strategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var addPet = require('./routes/addPet');
var sendMessage = require('./routes/sendMessage');
var sendEmail = require('./routes/sendEmail');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 6000000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/registerUser', register);
app.use('/user', user);
app.use('/pets', addPet);
app.use('/sendMessage',sendMessage);
app.use('/email', sendEmail);
app.use('/*', index);

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI !== undefined) {
    // use the string value of the environment variable
    // mongoURI = process.env.MONGODB_URI;
    mongoURI = 'mongodb://heroku_6dpdg90h:u3fme3v5lq225cmpfeuhvitvfe@ds161021.mlab.com:61021/heroku_6dpdg90h';
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/passport';
}

// var mongoURI = "mongodb://localhost:27017/passport";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
  //  res.sendStatus(500);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo, meow!");
});

// App Set //
app.set('port', (process.env.PORT || 3333));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
