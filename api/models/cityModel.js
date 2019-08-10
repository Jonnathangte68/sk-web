'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CitySchema = new Schema({
  name: {
    type: String,
    required: 'Name of the City'
  },
  state: {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('City', CitySchema);
