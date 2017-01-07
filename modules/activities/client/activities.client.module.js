/** Created by CUIJA on 01-06-2017.*/
(function(app){
  'use strict';

  app.registerModule('activities',['core']);
  app.registerModule('activities.admin',['core.admin']);
  app.registerModule('activities.admin.routes',['core.admin.routes']);
  app.registerModule('activities.services');
  app.registerModule('activities.routes', ['ui.router', 'core.routes', 'activities.services']);
})(ApplicationConfiguration);
