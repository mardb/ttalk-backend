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
// posts

exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });
  // body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first error 
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
