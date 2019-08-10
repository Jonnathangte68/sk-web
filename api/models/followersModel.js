'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var followersSchema = new Schema({
  a: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  b: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  updates: {
    type: Number, default:0
  },
  status: {
    type: String,
    default: 'Pending'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Followers', followersSchema);
