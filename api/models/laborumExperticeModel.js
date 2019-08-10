'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LaborumExperticeSchema = new Schema({
  name: {            // Este Institucion
    type: String,
  },
  description : {   // Este descripcion
    type: String,
  },
  status : {
    type: Boolean,
  },
  begin_date : {     //Este
    type: Number,
  },
  end_date : {
    type: Date,
  },
  department : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Department',
  },
  sector : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Sector',
  },
  position : {
    type : mongoose.Schema.Types.ObjectId, ref: 'Position',
  },
  talent : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Talent',
  },
  work_type : {
    type: Array,
    'default':
    [
      'Part Time',
      'Full Time',
      'Remote',
    ]
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('LaborumExpertice', LaborumExperticeSchema);
