//any auth related validators

const { check } = require("express-validator");

exports.userSignupValidator = [
  //check for name
  check("name").not().isEmpty().withMessage("Name is required"),
  //check for email
  check("email").isEmail().withMessage("Please enter a valid email."),
  //password
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.userSigninValidator = [
  //check for email
  check("email").isEmail().withMessage("Please enter a valid email."),
  //password
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
