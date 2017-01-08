/* Created by Aquariuslt on 2017-01-07.*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivityAttachmentSchema = new Schema({
  activityId: {
    type: Schema.ObjectId,
    ref: 'Activity',
    required: true
  },
  fileType: {
    type: String,
    enum: ['image', 'other'],
    default: 'image'
  },
  //relative link
  link: {
    type: String,
    trim: true,
    required: true
  }

});

mongoose.model('ActivityAttachment',ActivityAttachmentSchema);
