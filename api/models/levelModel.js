'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LevelSchema = new Schema({
  name: {
    type: String,
    required: 'Level of the talent'
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

module.exports = mongoose.model('Level', LevelSchema);
