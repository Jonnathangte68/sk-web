'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PublicImageSchema = new Schema({
  name: {
  	type: String
  },
  public_route: {
  	type: String
  },
  folder_route: {
  	type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('PublicImage', PublicImageSchema);
