'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CountrySchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Country'
  },
  code: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Country', CountrySchema);
