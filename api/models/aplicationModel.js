'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AplicationSchema = new Schema({
  job : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Job'
  },
  talent : {type: mongoose.Schema.Types.ObjectId, ref: 'Talent'}, 
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Aplication', AplicationSchema);


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