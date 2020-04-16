const express = require("express");
const router = express.Router();

const { requireSignin} =  require('../controllers/auth')
const { read, update} = require("../controllers/user");

//validators

//checks toke with requireSignin then reads
router.get("/user/:id",  requireSignin, read );
router.put("/user/update", requireSignin, update);

module.exports = router;

