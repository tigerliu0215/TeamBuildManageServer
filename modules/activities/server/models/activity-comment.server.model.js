/* Created by Aquariuslt on 2017-01-08.*/
/* Created by Aquariuslt on 2017-01-07.*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivityCommentSchema = new Schema({
  sequence: {
    type: Number,
    default: 1
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String
  }

});

mongoose.model('ActivityComment', ActivityCommentSchema);
