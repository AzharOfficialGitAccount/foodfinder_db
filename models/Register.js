const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    Required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

exports.Register = mongoose.model('Register', registerSchema);
