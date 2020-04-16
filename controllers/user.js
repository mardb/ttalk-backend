const User = require('../models/user');


exports.read = (req, res) => {
  const userId  = req.params.id
  User.findById(userId).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User not found.'
      })
    }
    //this i super important, removes user salt/hash
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

exports.update = (req, res) => {
  console.log('UpdateUser:', req.user, 'Update data:', req.body)
}