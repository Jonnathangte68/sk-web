'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var IdiomaSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Idioma'
  },
  code: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Idioma', IdiomaSchema);
