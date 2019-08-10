'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StateSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the State'
  },
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('State', StateSchema);
