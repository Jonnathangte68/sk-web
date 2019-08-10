'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FolderSchema = new Schema({
  name: {               // Este
    type: String,
  },
  videos : {       // Este
    type : [{type: mongoose.Schema.Types.ObjectId, ref : 'Video'}]
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiVefjo6A-LTltp7OU7DfDaLhUXDc5xQSZgCv8_o17oQct02Hh'
  },
  user : {       // Este
    type: String,
    //type : {type: mongoose.Schema.Types.ObjectId, ref : 'User'}
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Folder', FolderSchema);
