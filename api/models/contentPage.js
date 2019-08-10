'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContentPageSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  title : {
    type: String,
  },
  keywords : [{type: String}],
  renderedcode : {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('ContentPage', ContentPageSchema);