'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Category'
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Category', CategorySchema);