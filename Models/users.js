const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
