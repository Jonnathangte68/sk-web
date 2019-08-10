'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hiddensSchema = new Schema({
  url: {
    type: String
  },
  mask: {
    type: String
  }
});

module.exports = mongoose.model('Hidden', hiddensSchema);
