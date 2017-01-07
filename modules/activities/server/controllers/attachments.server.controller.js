/* Created by Aquariuslt on 2017-01-08.*/


var _ = require('lodash');
var  fs = require('fs');
var  path = require('path');
var  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var  mongoose = require('mongoose');
var  multer = require('multer');
var  config = require(path.resolve('./config/config'));
var  User = mongoose.model('User');
var  validator = require('validator');





module.exports.uploadAttachment = uploadAttachment;




function uploadAttachment (req,res){

  var multerConfig = config.uploads.attachments.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  var upload = multer(multerConfig).single('activitiesAttachment');

  uploadImage()
    .then(function(){
      var attachmentUrl = config.uploads.attachments.image.dest + req.file.filename;
      res.json({
        result:'success',
        attachmentUrl:attachmentUrl
      })
    })
    .catch(function(error){
      res.status(422).send(error);
    })
  ;


  function uploadImage () {
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
