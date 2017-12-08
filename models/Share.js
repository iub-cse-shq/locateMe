var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShareSchema = {
  long: {
    type: Number,
    required: 'Longitude required'
  },
  
  lat: {
    type: Number,
    required: 'Latitude required'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Share = mongoose.model('Share', ShareSchema, 'shares');
module.exports = Share;
