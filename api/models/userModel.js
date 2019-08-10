'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  email: {type: String},
  password: String,
  token: String,
  fbAuthToken: String,
  privateAccount: {
    type: Boolean,
    default: false
  },
  admin: Boolean,
  active: {type:Boolean,default:true},
  first_entrance:{type:Boolean,default:true},
  settings_notifications: {
      type: Number, 
      default: 3 // Show all notifications
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', UserSchema);
