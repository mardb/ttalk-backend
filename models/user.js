const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
      name: {
          type: String,
          trim: true,
          required: true,
          max: 50
      },
      email: {
          type: String,
          trim: true,
          required: true,
          unique: true,
          lowercase: true
      },
      hashed_password: {
          type: String,
          required: true
      },
      salt: String,
      role: {
          type: String,
          default: 'subscriber'
      },
      resetPasswordLink: {
          data: String,
          default: ''
      }
  },
  { timestamps: true }
);

//virtual field

userSchema.virtual('password')
.set(function(password) {
  this._password = password
  this.salt = this.makeSalt()
  .this.hashed_password = this.encryptPassword(password)
})
.get(function() {
  return this._password
})
//methods
userSchema.methods = {
  //if thres a match
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword:function(password) {
    if(!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt)
      .update(password)
      .digest('hex')
    } catch(err){
      return ''
    }
  },
  //make salt methond
  makeSalt: function(){
    return matchMedia.round(new Date().valueOf() * Math.random()) + ''
  }
}

module.exports = mongoose.model('User', userSchema)