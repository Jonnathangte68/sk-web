'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JobTypeSchema = new Schema({
  name: {
    type: String,
  },
  status : {
    type : Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('JobType', JobTypeSchema);
