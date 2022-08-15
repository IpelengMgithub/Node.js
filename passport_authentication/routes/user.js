const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 

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
        //before calling in a user we will check mongo if the user already exists
        User.findOne({email:email})
        .then(user => {
            if(user){
             //the user exists  
             errors.push({msg: 'The email typed in has been already registered'});
             res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            });  
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //hash passowrd
                bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password, salt,(err, hash) =>{
                        if(err) throw err;

                        //set the password to hash
                        newUser.password = hash;
                        //Save user
                        newUser.save()
                            .then(user =>{
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                  );
                                res.redirect('/user/login');
                            })
                            .catch(err => console.log(err));
                } ));
            }
        });
    }
});

module.exports = router;