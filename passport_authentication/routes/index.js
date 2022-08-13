const express = require('express');
const router = express.Router();

//home page
router.get('/', (rep,res) => res.send("welcome home"));

module.exports = router;