const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

dotenv.config();

// Passport Config
require('./config/passport')(passport);


//connecting to mongo 
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('mongo database connected..'))
    .catch(err => console.log(err));

//ejs temp
app.use(expressLayouts);
app.set('view engine','ejs');

// bodyparser
app.use(express.urlencoded({extended : false}));

// express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//varialbles
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const portNumber = process.env.portNumber || 8015;

app.listen(portNumber, console.log(`running server on port ${portNumber}`));
