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
module.exports.toggleLike = toggleLike;
module.exports.toggleCollect = toggleCollect;
module.exports.doVoting = doVoting;

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

function wrapActivityWithUserData(activity,user){
  if(_.isUndefined(user)){
    return activity;
  }
  else{
    var username = user.username;
    if(!_.isUndefined(activity.likes)){
      activity.isLiked = activity.likes.indexOf(username) > -1;
    }
    else{
      activity.isLiked = false;
    }

    if(!_.isUndefined(activity.collects)){
      activity.isCollected = activity.collects.indexOf(username) > -1;
    }
    else{
      activity.isCollected = false;
    }

    if(!_.isUndefined(activity.votings)){
      _.each(activity.votings,function(voting){
        _.each(voting.options,function(option){
          if(!_.isUndefined(_.result(_.find(option.voteDetails,{'createdBy':user.username}),'createdBy'))){
            voting.isVoted = true;
          }
        });
      });
    }

    return activity;
  }
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

  res.json(wrapActivityWithUserData(activity,req.user));
}

function update(req, res) {
  var activity = req.activity;
  var activityUpdateContent = req.body;
  activity = _.assign(activity, activityUpdateContent);


  activity.updated = Date.now();
  activity.updatedBy = req.user;

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(wrapActivityWithUserData(activity,req.user));
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
      res.json(wrapActivityWithUserData(activity,req.user));
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


function toggleLike(req,res){
  var activity = req.activity;
  var user = req.user;
  var username = user.username;

  activity = calToggleLike(username,activity);

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(wrapActivityWithUserData(activity,req.user));
    }
  });

  function calToggleLike(username,activity){
    if(_.isUndefined(activity.likes)){
      activity.likes = [];
    }

    if(_.indexOf(activity.likes,username) == -1){
      activity.likes.push(username);
    }
    else{
      var userIndex = _.indexOf(activity.likes,username);
      activity.likes.splice(userIndex,1);
    }

    return activity;
  }
}

function toggleCollect(req,res){
  var activity = req.activity;
  var user = req.user;
  var username = user.username;

  activity = calToggleCollect(username,activity);

  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(wrapActivityWithUserData(activity,req.user));
    }
  });

  function calToggleCollect(username,activity){
    if(_.isUndefined(activity.collects)){
      activity.collects = [];
    }

    if(_.indexOf(activity.collects,username) == -1){
      activity.collects.push(username);
    }
    else{
      var userIndex = _.indexOf(activity.collects,username);
      activity.collects.splice(userIndex,1);
    }

    return activity;
  }
}


function doVoting(req,res){
  var activity = req.activity;
  var user = req.user;
  //noinspection JSUnresolvedVariable
  var votingIndex = req.params.votingIndex;
  var votingSelection = req.body.selection;

  activity = calDoVote(user,activity,votingIndex,votingSelection);
  /*
  console.log('currentVoting in activity:');
  console.log(activity.votings[votingIndex]);
  _.each(activity.votings[votingIndex].options,function(option){
    console.log(option.voteDetails);
  });
  */
  activity.markModified('votings');
  activity.save(function (error) {
    if (error) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(error)
      });
    }
    else {
      res.json(wrapActivityWithUserData(activity,req.user));
    }
  });

  function calDoVote(user,activity,votingIndex,votingSelection){
    var voting = activity.votings[votingIndex];

    if(_.isEqual(voting.selectionType,'single')){
      _.each(voting.options,function(option){
        if(option.sequence == votingSelection){
          //console.log('_.result(_.find(option.voteDetails,{\'createdBy\':user.username},\'createdBy\'):',_.result(_.find(option.voteDetails,{'createdBy':user.username},'createdBy')));
          if(_.isUndefined(_.result(_.find(option.voteDetails,{'createdBy':user.username}),'createdBy'))){
            option.voteDetails.push({
              createdBy:user.username,
              created:new Date()
            });
          }
        }
      });
    }
    else{
      _.each(voting.options,function(option){
        if(votingSelection.indexOf(option.sequence)>-1){
          if(_.isUndefined(_.result(_.find(option.voteDetails,{'createdBy':user.username}),'createdBy'))){
            option.voteDetails.push({
              createdBy:user.username,
              created:new Date()
            });
          }
        }
      });
    }

    activity.votings[votingIndex] = voting;
    return activity;
  }
}
