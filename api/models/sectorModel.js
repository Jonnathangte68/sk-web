'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SectorSchema = new Schema({
  name: {
    type: String,
  },
  description : {
    type: String,
  },
  status : {
    type: Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Sector', SectorSchema);
