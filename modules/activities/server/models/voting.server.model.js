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
        type: String
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
  selectionType:{
    type: String,
    enum :['single','multi'],//....should considering how design multi select when select it
    default : 'single',
    required: true
  },
  options:{
    type:[OptionSchema]
  },


  //TODO:considering about should keep these fields in activities sub-models.
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
