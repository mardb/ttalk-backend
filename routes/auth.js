const express = require("express");
const router = express.Router();

const {
  googleLogin,
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

//validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validator/auth");
const { runValidation } = require("../validator/index");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);

//posts
// router.get('/posts', getPosts)

//forgot reset password
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);
router.post('/google-login', googleLogin)

module.exports = router;
