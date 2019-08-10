'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TalentFavouriteSchema = new Schema({
  name: {
    type: String,
  },
  favourites : [{type: mongoose.Schema.Types.ObjectId, ref : 'Talent'}],
  talent : {
    type: mongoose.Schema.Types.ObjectId, ref : 'Talent'
  },
  status : {
    type: Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('TalentFavourite', TalentFavouriteSchema);
