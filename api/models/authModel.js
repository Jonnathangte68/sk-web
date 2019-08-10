'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AuthSchema = new Schema({
  username : {
    type: String
  },
  ip_address : {
    type: String
  },
  token : {
    type: String
  }, 
  intents : {
    type: Number
  },
  ses_chunk : {
    type: String
  }, 
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Auth', AuthSchema);