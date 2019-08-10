'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AwardSchema = new Schema({
  name: {       // Year
    type: String,
  },
  description : {       // Institution
    type : String,
  },
  status : {
    type : Boolean,
  },
  talent : {
    type : mongoose.Schema.Types.ObjectId, ref : 'Talent'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Award', AwardSchema);
