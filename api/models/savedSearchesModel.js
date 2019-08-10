'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SavedSearchSchema = new Schema({
  name: {
    type: String,
  },
  values : {type: Array},
  status : {
    type : Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('SavedSearch', SavedSearchSchema);
