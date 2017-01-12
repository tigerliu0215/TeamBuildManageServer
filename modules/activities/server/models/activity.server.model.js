/** Created by CUIJA on 01-06-2017.*/

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotingSchema = require('./voting.server.model');
var AttachmentSchema = require('./activity-attchment.server.model');
var CommentSchema = require('./activity-comment.server.model');

var ActivitySchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  htmlContent: {
    type: String,
    default: '',
    trim: true
  },
  attachments: {
    type: [AttachmentSchema]
  },
  votings: {
    type: [VotingSchema]
  },
  comments: {
    type: [CommentSchema]
  },
  likes:{
    type:[String] //use userId
  },
  collects: {
    type: [String] //use userId
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


mongoose.model('Activity', ActivitySchema);
