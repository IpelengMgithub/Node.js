const express = require('express');
const router = express.Router();

//login page
router.get('/login', (rep,res) => res.send("login"));

//register page
router.get('/register', (rep,res) => res.send("register"));

module.exports = router;