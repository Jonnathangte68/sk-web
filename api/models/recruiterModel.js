'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecruiterSchema = new Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  birth_year : {
    type: Number,
  },
  gender: {
    type : String,
  },
  address : {
    street: {type: String},
    zip : {type: String},
    city : {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    state : {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
    country : {type: mongoose.Schema.Types.ObjectId, ref: 'Country'}, 
  },
  recruitertype : {
    type: mongoose.Schema.Types.ObjectId, ref: 'RecruiterType'
  },
  institution : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Institution',
    required: false
  },
  profile_image : {
    type: String
  },
  about_info: {
    type: String
  },
  following : {
    type: Number,
  },
  followers : {
    type: Number,
  },
  connections : {
    type: Number,
  },
  idioma : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Idioma'
  },
  interest_list : [{type: mongoose.Schema.Types.ObjectId, ref: 'Interest'}],
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

module.exports = mongoose.model('Recruiter', RecruiterSchema);
