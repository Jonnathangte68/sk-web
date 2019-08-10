'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var favouriteFolderSchema = new Schema({
  folder_name: {
    type: String
  },
  videos: {
    type: Array
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('favouriteFolders', favouriteFolderSchema);
