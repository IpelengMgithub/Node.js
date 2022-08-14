const express = require('express');
const router = express.Router();

//User model
const User = require('../models/User'); 

//login page
router.get('/login', (rep,res) => res.render("login"));

//register page
router.get('/register', (rep,res) => res.render("register"));

//register handle
router.post('/register', (req,res) => {
    const { name, email, password, password2} = req.body;
    let errors = [];

    //check for fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please enter the fields required'});
    }

    //check whether the passowords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    //check password length
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters long'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('passed');
    }
});

module.exports = router;