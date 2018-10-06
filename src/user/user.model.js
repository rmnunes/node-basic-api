const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    email: { type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true },
    password: String,
    isEnabled: { type: Boolean, required: true, default: false },
  }, { timestamps: true });
  
  userSchema.plugin(uniqueValidator, { message: "is already taken." });
  
  const User = module.exports = mongoose.model('User', userSchema);
  
  /**
  * Find all users.
  */
  module.exports.getAllUsers = () => User.find();