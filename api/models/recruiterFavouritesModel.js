'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecruiterFavouriteSchema = new Schema({
  name: {
    type: String,
  },
  favourites : {
    type: Array,
    "default":
    [
      {type: mongoose.Schema.Types.ObjectId, ref : 'Talent'},
    ]
  },
  recruiter : {
    type: mongoose.Schema.Types.ObjectId, ref : 'Recruiter'
  },
  status : {
    type: Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('RecruiterFavourite', RecruiterFavouriteSchema);
