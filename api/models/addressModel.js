'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AddressSchema = new Schema({
  country: {type: mongoose.Schema.Types.ObjectId, ref : 'Country'},
  state: {type: mongoose.Schema.Types.ObjectId, ref : 'State'},
  city: {type: mongoose.Schema.Types.ObjectId, ref : 'City'},
  details: {String},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Address', AddressSchema);
