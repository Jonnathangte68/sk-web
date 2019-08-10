'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatthreadSchema = new Schema({
  user: {
      type : mongoose.Schema.Types.ObjectId, ref : 'User'
  },
  to_user: {
      type : mongoose.Schema.Types.ObjectId, ref : 'User'    
  },
  messages: {
    type:Array,
  },//[{type: mongoose.Schema.Types.ObjectId, ref: 'Chatmessage'}],
  last_message: {type: mongoose.Schema.Types.ObjectId, ref: 'Chatmessage'},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Chatthread', ChatthreadSchema);
