/* Created by Aquariuslt on 2017-01-07.*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivityCollectSchema = new Schema({
  activityId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
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


mongoose.model('ActivityCollect', ActivityCollectSchema);
