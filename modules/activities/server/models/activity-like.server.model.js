/* Created by Aquariuslt on 2017-01-07.*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivityLikeSchema = new Schema({
  activityId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['like', 'unlike'],
    default: 'like'
  },

  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


mongoose.model('ActivityLike', ActivityLikeSchema);
