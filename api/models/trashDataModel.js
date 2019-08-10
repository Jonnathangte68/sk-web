'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TrashDataSchema = new Schema({
  data: {
    type: String,
  },
  register_key: {
    type: String,
  },
  register_username: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('TrashData', TrashDataSchema);