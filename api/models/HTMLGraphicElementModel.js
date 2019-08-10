'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HTMLGraphicElement = new Schema({
  name: {type: String, unique: true},
  css: {type:String},
  content: {type:String},
  img: {type:String},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('HTMLGraphicElement', HTMLGraphicElement);
