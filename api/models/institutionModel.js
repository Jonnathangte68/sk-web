'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InstitutionSchema = new Schema({
  name: {
    type: String,
  },
  description : {
    type: String,
  },
  company_director : {
    type: String,
  },
  website : {
    type : String,
  },
  phone_number : {
    type : String,
  },
  area : {
    type: Array,
    'default':[
      'Family',
      'Religion',
      'Peer Groups',
      'Economic Systems',
      'Legal Systems',
      'Penal System',
      'Language',
      'Mass Media',
      'Learning',
      'Educational',
      'Research',
      'Medicine',
      'Military',
      'Research',
      'Industry',
      'Civil Society',
      'Research',
      'Art & Culture',
    ]
  },
  type : {
    type: Array,
    'default':[
      'Formal',
      'Informal',
    ]
  },
  address : {
    city: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    country : {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
    state : {type: mongoose.Schema.Types.ObjectId, ref: 'State'},
    details : {type: mongoose.Schema.Types.ObjectId, ref: 'Details'},
  },
  facebook : {
    type: String,
  },
  twitter : {
    type: String,
  },
  youtube : {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Institution', InstitutionSchema);
