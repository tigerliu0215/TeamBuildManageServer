/* Created by Aquariuslt on 2017-01-08.*/


var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var mongoose = require('mongoose');
var multer = require('multer');
var config = require(path.resolve('./config/config'));
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');
var validator = require('validator');


module.exports.uploadAttachment = uploadAttachment;
module.exports.getPopularImages = getPopularImages;


function uploadAttachment(req, res) {

  var multerConfig = config.uploads.attachments.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  var upload = multer(multerConfig).single('activitiesAttachment');

  uploadImage()
    .then(function () {
      var attachmentUrl = config.uploads.attachments.image.dest + req.file.filename;
      res.json({
        result: 'success',
        attachmentUrl: attachmentUrl
      })
    })
    .catch(function (error) {
      res.status(422).send(error);
    })
  ;


  function uploadImage() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }

}

function getPopularImages(req, res) {
  var limit = 8;

  if(!_.isUndefined(req.query.limit)){
    limit = _.parseInt(req.query.limit);
  }

  Activity.find({
    attachments:{
      $exists:true,
      $ne:[]
    }
  })
    .sort('-created')
    .limit(limit)//TODO:should update to be configurable
    .exec(function(error,activities){
      if (error) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(error)
        });
      } else {
        var attachments = [];
        _.each(activities,function(activity){
          if(!_.isUndefined(activity.attachments)){
            _.each(activity.attachments,function(attachment){
              attachment.activityId = activity._id;
            });
            attachments = attachments.concat(activity.attachments);
          }
        });


        res.json(attachments);
      }
    });
}
