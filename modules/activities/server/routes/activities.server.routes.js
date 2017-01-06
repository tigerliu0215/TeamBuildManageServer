/** Created by CUIJA on 01-06-2017.*/

var activities = require('../controllers/activities.server.controller');


module.exports = function (app) {
  app.route('/api/activities')
    .get(activities.list);


};
