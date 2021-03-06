const User = require("../models/user");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found.",
      });
    }

    //this i super important, removes user salt/hash
    // set as null instead of undefined according to Carson. 

    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  // console.log('UpdateUser:', req.user, 'Update data:', req.body)
  const { name, password } = req.body;
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found ",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is Required",
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be a minimum of 6 characters long",
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if(err) {
        console.log("User update error: ", err)
        return res.status(400).json({
          error: 'User update failed'
        })
      }
      updatedUser.hashed_password = undefined
      updatedUser.salt = undefined 
      res.json(updatedUser)
    })
  });
};
