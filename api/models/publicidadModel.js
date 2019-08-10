'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PublicidadSchema = new Schema({
  name : {
    type: String
  },
  description : {
    type : String,
  },
  company : {
    type : String,
  },
  banner_url : {
    type : String,
  },
  banner_buffer : {
    type : Buffer,
  },
  start_date : {
    type: Date        
  },
  end_date : {
    type: Date  
  },
  relevance : {
    type : Array,
    "default" : [
      "Low",
      "Medium",
      "Very Relevant",
      "Very very Relevant",
      "Top",
    ]
  },
  active : {
    type : Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

// Agregar la region o UNIVERSAL

module.exports = mongoose.model('Publicidad', PublicidadSchema);


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