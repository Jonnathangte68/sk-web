'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EnterpriseSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Enterprise'
  },
  moto: {type:String},
  sub_moto: {type:String},
  email: {type:String},
  phone: {type:String},
  logo_url: {type:String},
  img_principal: {type:String},
  favicon: {type:String},
  address_detail : {type: String},
  cabecera_title: {type: String},
  director: {type:String},
  country: {type:String},
  state: {type:String},
  city: {type:String},
  keywords: {type: Array},
  zip_code: {type: String},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);
