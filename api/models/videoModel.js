'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  name: {
    type: String,
    required: 'Name of the Playlist'
  },
  description: {
    type: String,
  },
  url : {
    type: String,
  },
  front_image : {
    type: Buffer,
  },
  catalog_id : {
    type: mongoose.Schema.Types.ObjectId, ref : 'VideoCatalog',
  },
  status : {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Video', VideoSchema);


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