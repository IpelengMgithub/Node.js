const express = require('express');
const app = express();

// routes 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const portNumber = process.env.portNumber || 8000;

app.listen(portNumber, console.log(`running server on port ${portNumber}`));
