'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SubcategorySchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Sub Category'
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
  },
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
