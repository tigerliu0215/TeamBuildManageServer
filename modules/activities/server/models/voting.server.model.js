/** Created by CUIJA on 01-06-2017.*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Option Schema
 * Considering whether should voting result add
 * in OptionSchema?
 * */
var OptionSchema = new Schema({
  sequence:Number,
  description:String,
  voteDetails:{
    //who vote this option?
    //when vote?
    type:[{
      created:{
        type: Date,
        default: Date.now
      },
      createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
      }
    }]

  }
});

var VotingSchema = new Schema({
  title:{
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  options:{
    type:[OptionSchema]
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

mongoose.model('Voting',VotingSchema);
