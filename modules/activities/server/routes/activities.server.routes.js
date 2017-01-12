/** Created by CUIJA on 01-06-2017.*/

var activities = require('../controllers/activities.server.controller');
var attachments = require('../controllers/attachments.server.controller');
var activitiesPolicy = require('../policies/activities.server.policy');

module.exports = function (app) {
  app.route('/api/activities').all(activitiesPolicy.isAllowed)
    .get(activities.list)
    .post(activities.create);


  app.route('/api/activities/:activityId').all(activitiesPolicy.isAllowed)
    .get(activities.read)
    .put(activities.update)
    .delete(activities.delete);

  app.route('/api/attachments/upload').all(activitiesPolicy.isAllowed)
    .post(attachments.uploadAttachment);

  app.route('/api/popular-images')
    .get(attachments.getPopularImages);

  app.route('/api/activities/comments/publish/:activityId').all(activitiesPolicy.isAllowed)
    .post(activities.publishComment);

  app.route('/api/activities/action/like/:activityId').all(activitiesPolicy.isAllowed)
    .get(activities.toggleLike);

  app.route('/api/activities/action/collect/:activityId').all(activitiesPolicy.isAllowed)
    .get(activities.toggleCollect);

  app.route('/api/activities/action/vote/:activityId/:votingIndex').all(activitiesPolicy.isAllowed)
    .post(activities.doVoting);

  app.param('activityId',activities.findById);
};
