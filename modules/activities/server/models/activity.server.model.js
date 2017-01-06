/** Created by CUIJA on 01-06-2017.*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  title:{
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  htmlContent:{
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Date
  },
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


mongoose.model('Activity',ActivitySchema);
