'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EducationSchema = new Schema({
  name: {
    type: String,
  },
  description : {
    type : String,
  },
  year : {
    type : Number,
  },
  status : {
    type : Boolean,
  },
  type : {
    type: mongoose.Schema.Types.ObjectId, ref : 'EducationType'
  },
  talent : {
    type: mongoose.Schema.Types.ObjectId, ref : 'Talent'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Education', EducationSchema);
