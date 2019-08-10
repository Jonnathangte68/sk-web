'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var connectionSchema = new Schema({
  leftside_user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  rightside_user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },/*
  talent: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Talent'
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter'
  },*/
  /* Pending, Connected, Disconected, Blocked */
  status: {
    type: String,
    default: 'Pending'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Connection', connectionSchema);
