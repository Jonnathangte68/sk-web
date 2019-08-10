'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JobSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Job'
  },
  title: {
    type: String,
    required: 'Title of the Job'
  },
  description: {
    type: String,
  },
  requirements: {
    type: String,
    required: false
  },
  imagen: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category'
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'
  },
  job_type : {
    type: mongoose.Schema.Types.ObjectId, ref: 'JobType',
    required: false, 
    default: null
  },
  representant : {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  level : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Level'
  },
  city : {
    type: mongoose.Schema.Types.ObjectId, ref: 'City',
    required: false
  },
  state : {
    type: mongoose.Schema.Types.ObjectId, ref: 'State'
  },
  country : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Country'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Job', JobSchema);


/*

_id: mongoose.Schema.Types.ObjectId,
type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author'
},
ratings: [
    {
        summary: String,
        detail: String,
        numberOfStars: Number,
        created: { 
            type: Date,
            default: Date.now
        }
    }
],

*/