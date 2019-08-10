'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PageSchema = new Schema({
  name: {               // Este
    type: String,
  },
  html : {       // Este
    type : String,
  },
  css : {
    type : String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Page', PageSchema);
