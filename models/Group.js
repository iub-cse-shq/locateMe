var Person = require('./../models/Person.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroupSchema = {
  name: {
    type: String,
    trim: true,
    required: 'Name required',
  },
  
  // pass: {
  //   type: String,
  //   default: ''
  // },
  
  persons: [{ type: Schema.Types.ObjectId, ref: 'Person' }],

  created: {
    type: Date,
    default: Date.now
  }
}

var Group = mongoose.model('Group', GroupSchema, 'groups');
module.exports = Group;
