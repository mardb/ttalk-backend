const express = require("express");
const router = express.Router();

const {requireSignin} =  require('../controllers/auth')
const { read } = require("../controllers/user");

//validators

//checks toke with requireSignin then reads
router.get("/user/:id", requireSignin, read );


module.exports = router;
