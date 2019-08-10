'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContentTextAreaSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  text : {
    type: String,
  },
  secuence : {
    type: Number,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('ContentTextArea', ContentTextAreaSchema);