const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


//ejs temp
app.use(expressLayouts);
app.set('view engine','ejs')

// routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const portNumber = process.env.portNumber || 8000;

app.listen(portNumber, console.log(`running server on port ${portNumber}`));
