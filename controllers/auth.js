const User = require("../models/user");
const jwt = require("jsonwebtoken");
//sendgrid
const sgMail = require("@sendgrid/mail");
const expressJWT = require("express-jwt");
const _ = require("lodash");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.signup = (req, res) => {
//   // console.log('req body for signup', req.body);
//   const {name, email, password} = req.body

//   User.findOne({email}).exec((err, user) => {
//     if(user) {
//       return res.status(400).json({
//         error: 'Email is already taken'
//       });
//     }
//   });

//   let newUser = new User({ name, email, password })

//   newUser.save((err, success) => {
//     if(err) {
//       console.log('Signup Error.', err)
//       return res.status(400).json({
//         error: err
//       });
//     }
//     res.json({
//       message: 'Signup successful! '
//     });
//   });
// };

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already in use",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "30m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Confirm your account on TinkleTalk`,
      html: `
          <h1>Thanks for signing up with TinkleTalk! You must follow this link to activate your account:</h1>
          <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
          <hr />
          <p>You can also paste think link on your browser! </p>
          <p>${process.env.CLIENT_URL}</p>
          `,
    };
    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log('SIGNUP EMAIL SENT', sent)
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your account.`,
        });
      })
      .catch((err) => {
        // console.log('SIGNUP EMAIL SENT ERROR', err)
        return res.json({
          message: err.message,
        });
      });
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (
      err,
      decoded
    ) {
      if (err) {
        console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
        return res.status(401).json({
          error: "Expired link. Signup again",
        });
      }

      const { name, email, password } = jwt.decode(token);

      const user = new User({ name, email, password });

      user.save((err, user) => {
        if (err) {
          console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error:
              "There was an error saving user in database. Try signup again.",
          });
        }
        return res.json({
          message: "Signup success. Please signin.",
        });
      });
    });
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
// -----------------------------------------------------------------

//endpoints checks webtoken validity and exp. If true, give access.
//validates data and makes it available in req.user
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
});

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "15m",
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link from TinkleTalk.`,
      html: `
              <h1>Please use the following link to reset your password</h1>
              <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
              <hr />
              <p>This email may contain sensitive information</p>
              <p>${process.env.CLIENT_URL}</p>
          `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log("Reset password link error:", err);
        return res.status(400).json({
          error: "Database connection error on user password forgot request.",
        });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            return res.json({
              message: `Email has been sent to ${email}. Please follow the instruction to activate your account`,
            });
          })
          .catch((err) => {
            return res.json({
              message: err.message,
            });
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(400).json({
          error: "This link has expired. Please try resetting password again.",
        });
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error:
              "Something went terribly wrong. Please try again in 15 minutes.",
          });
        }
        const updatedFields = {
          password: newPassword,
          resetPasswordLink: "",
        };

        user = _.extend(user, updatedFields);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error:
                "We encountered an error while resetting the user password. ",
            });
          }
          res.json({
            message: `Reset password was successful. Please log in with your new password.`,
          });
        });
      });
    });
  }
};
