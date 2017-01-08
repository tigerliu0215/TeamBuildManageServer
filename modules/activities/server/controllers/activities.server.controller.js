/** Created by CUIJA on 01-06-2017.*/

var _ = require('lodash');
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


module.exports.list = listActivities;
module.exports.findById = findById;
module.exports.create = create;
module.exports.read = read;
module.exports.update = update;
module.exports.delete = del;

module.exports.publishComment = publishComment;

function listActivities(req, res) {
  Activity
    .find()
    .sort('-created')
    .populate('createdBy', 'displayName')
    .populate('updatedBy', 'displayName')
    .exec(function (error, activities) {
      if (error) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(error)
        });
      } else {
        res.json(activities);
      }
    });
}

function findById(req, res, next, activityId) {
  if (!mongoose.Types.ObjectId.isValid(activityId)) {
    return res.status(400).send({
      message: 'ActivityId is invalid'
    });
  }

  Activity
    .findById(activityId)
    .populate('createdBy', 'displayName')
    .populate('updatedBy', 'displayName')
    .exec(function (error, activity) {
      if (error) {
        return next(err);
      } else if (!activity) {
        return res.status(404).send({
          message: 'No activity with that identifier has been found'
        });
      }
      req.activity = activity;
      next();
    });
}

function create(req, res) {
  var activity = new Activity(req.body);
  activity.createdBy = req.user;
  activity.updated = Date.now();
  activity.updatedBy = req.user;

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(activity);
    }
  });
}

function read(req, res) {
  var activity = req.activity ? req.activity.toJSON() : {};

  res.json(activity);
}

function update(req, res) {
  var activity = req.activity;
  var activityUpdateContent = req.body;
  activity = _.assign(activity, activityUpdateContent);


  var user = req.user;
  activity.updated = Date.now();
  activity.updatedBy = req.user;

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(activity);
    }
  });
}

function del(req, res) {
  var activity = req.activity;

  activity.remove(function(error){
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    } else {
      res.json(activity);
    }
  });
}

function publishComment(req, res) {
  var activity = req.activity;
  var newComment = req.body;
  newComment.user = req.user;


  activity = addNewComment(activity, newComment);

  activity.updated = Date.now();
  activity.updatedBy = req.user;

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(activity);
    }
  });


  function addNewComment(act, newComment) {
    if (_.isUndefined(act.comments)) {
      act.comments = [];
    }

    var currentFloor = act.comments.length + 1;
    var currentDate = new Date();

    act.comments.push({
      sequence: currentFloor,
      content: newComment.content,
      created: currentDate,
      createdBy: newComment.user.displayName
    });
    return act;
  }
}
