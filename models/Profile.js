const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  profileName: {
    type: String,
    Required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

exports.Profile = mongoose.model('profile', profileSchema);
