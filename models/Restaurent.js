const mongoose = require('mongoose');

const restaurentSchema = mongoose.Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],

  title: {
    type: String,
    Required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
});

exports.Restaurent = mongoose.model('Restaurent', restaurentSchema);
