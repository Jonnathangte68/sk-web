'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SocialMediaSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  logo : {
  	type: Buffer,
  },
  logo_path : {
  	type: String,
  },
  description : {
  	type: String,
  },
  url : {
  	type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);