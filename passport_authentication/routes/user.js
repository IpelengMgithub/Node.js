const express = require('express');
const router = express.Router();

//login page
router.get('/login', (rep,res) => res.render("login"));

//register page
router.get('/register', (rep,res) => res.render("register"));

module.exports = router;