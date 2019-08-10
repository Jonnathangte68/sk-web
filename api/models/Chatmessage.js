'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatmessageSchema = new Schema({
  text: {
    type: String
  },
  status: {
    type: String
  },
  user: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Chatmessage', ChatmessageSchema);
