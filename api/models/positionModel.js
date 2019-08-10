'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PositionSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    required: 'Name of the Position'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Position', PositionSchema);
