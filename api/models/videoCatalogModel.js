'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoCatalogSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  videos : [{type: mongoose.Schema.Types.ObjectId, ref : 'Video'}],
  user : {
    type : mongoose.Schema.Types.ObjectId, ref : 'User', 
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('VideoCatalog', VideoCatalogSchema);


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