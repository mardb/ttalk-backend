const User = require('../models/user')

exports.signup = (req, res) => {
  // console.log('req body for signup', req.body)
  const {name, email, password} = req.body

  User.findOne({email}).exec((err, user) => {
    if(user) {
      return res.status(400).json({
        error: 'Email is already taken'
      })
    }
  })
  let newUser = new User({name, email, password})

  newUser.save((err, success) => {
    if(err) {
      console.log('Signup Error.', err)
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: 'Signup successful! '
    });
  });
};