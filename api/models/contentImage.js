'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContentImageSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  image : {
    type: Buffer,
  },
  image_path : {
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

module.exports = mongoose.model('ContentImage', ContentImageSchema);