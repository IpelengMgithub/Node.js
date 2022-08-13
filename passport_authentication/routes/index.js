const express = require('express');
const router = express.Router();

//home page
router.get('/', (rep,res) => res.render('welcome'));

module.exports = router;