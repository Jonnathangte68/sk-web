'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AchivementSchema = new Schema({
  name: {               // Este
    type: String,
  },
  description : {       // Este
    type : String,
  },
  status : {
    type : Boolean,
  },
  talent : {
    type : mongoose.Schema.Types.ObjectId, ref : 'Talent'
  },
  date_madeit: {
    type: Date,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Achivement', AchivementSchema);
