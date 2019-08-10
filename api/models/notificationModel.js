'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NotificationSchema = new Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  priority : {
    type: Number,
  },
  image: {
    type : String,
  },
  sound : {
    type: Number,
  },
  expire : {
    type: Date,
  },
  picture : {
    type: String,
  },
  user : {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  type : {
    type: Number
  },
  status : {
    type: Number        // 1 living, 0 dead
  },
  seen : {
    type: Number
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
