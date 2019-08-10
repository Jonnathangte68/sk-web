'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TalentSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Talent'
  },
  title: {
    type: String,
  },
  birth_year: {
    type: Number,
  },
  gender: {
    type : String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Address'
  },
  level: {type: mongoose.Schema.Types.ObjectId, ref: 'Level'},
  category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  subcategory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'}],
  profile_img : {
    type: String
  },
  following : {
    type: Number,
  },
  followers : {
    type: Number,
  },
  awards:[{type:mongoose.Schema.Types.ObjectId, ref: 'Award'}],
  achivements:[{type:mongoose.Schema.Types.ObjectId, ref: 'Achivement'}],
  education:[{type:mongoose.Schema.Types.ObjectId, ref: 'Education'}],
  expertice:[{type:mongoose.Schema.Types.ObjectId, ref: 'LaborumExpertice'}],
  idioma : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Idioma'
  },
  user : {
    type: mongoose.Schema.Types.ObjectId, ref : 'User'
  },
  user_type : {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Talent', TalentSchema);
