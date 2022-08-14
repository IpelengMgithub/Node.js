const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose'); 

//db connect
const db = require('./config/keys').MongoURI;

//connecting to mongo 
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('mongo database connected..'))
    .catch(err => console.log(err));

//ejs temp
app.use(expressLayouts);
app.set('view engine','ejs')

// bodyparser
app.use(express.urlencoded({extended : false}));

// routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const portNumber = process.env.portNumber || 8015;

app.listen(portNumber, console.log(`running server on port ${portNumber}`));
