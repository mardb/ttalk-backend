const{validationResult} = require('express-validator/check')

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    //422 (Unprocessable Entity)cannot process
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }
  next()
}

