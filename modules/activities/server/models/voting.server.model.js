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
  description:{
    type: String,
    default:''
  },
  selectionType:{
    type: String,
    enum :['single','multi'], //....should considering how design multi select when select it
    default : 'single',
    required: true
  },
  options:{
    type:[OptionSchema]
  },

  //Belows fields are look up for weibo.com twitter.com

  //After the endTime will disable update the voting result
  endTime:{
    type:Date
  },
  /**
   * Several types for visibility:
   * 1.All guest can view,but can not vote      -- all
   * 2.Only user role can view and vote         -- registered
   * 3.Only user role can view after they vote  -- voted
   */
  visibility:{
    type:String,
    enum:[
      'all',
      'registered',
      'voted'
    ],
    required:true,
    default:'all'
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
