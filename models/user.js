require('dotenv').config()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}]
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET)
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User