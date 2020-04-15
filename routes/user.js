const express = require("express");
const router = express.Router();

const { read } = require("../controllers/user");

//validators


router.get("/user/:id", read);


module.exports = router;
