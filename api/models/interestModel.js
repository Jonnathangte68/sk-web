'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InterestSchema = new Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
  status : {
    type : Boolean,
  },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter'},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Interest', InterestSchema);
